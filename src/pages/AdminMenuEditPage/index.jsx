import { Container } from "./styled.js";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { resizeFile } from "../../utils/resize.js";
import { useQuery, useQueryClient } from "react-query";
import supabase, {
  getCategory,
  getProduct,
} from "../../network/request/supabase.js";
import { getKRW } from "../../utils/formats.js";
import { useRecoilState } from "recoil";
import { timerState } from "../../recoil/atoms/timerState.js";

const MenuEdit = () => {
  const queryClient = useQueryClient();
  const MAX_CATEGORY_CNT = 5;

  const { data: category } = useQuery("categories", getCategory);
  const { data: product, refetch } = useQuery("products", getProduct);

  const [resizedImage, setResizedImage] = useState(null);

  const dragCatrogryIndex = useRef(null);
  const dragProductIndex = useRef(null);

  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  const [isDrag, setIsDrag] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productState, setProductState] = useState("판매중");
  const [productCategoryId, setProductCategoryId] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [curTab, setCurTab] = useState(0);

  const [timerValue, setTimerValue] = useState();

  const [sec, setSec] = useRecoilState(timerState);

  useEffect(() => {
    setTimerValue(sec);
  }, []);

  const onSubmitCreateCategory = async () => {
    if (categoryName.trim().length === 0) {
      alert("내용을 입력하세요.");
      return;
    }

    if (categoryList.length >= MAX_CATEGORY_CNT) {
      alert(`카테고리는 ${MAX_CATEGORY_CNT}개 까지만 등록할 수 있습니다.`);
      return;
    }

    const { data, error } = await supabase
      .from("category")
      .insert({ name: categoryName });

    setCategoryName("");

    queryClient.invalidateQueries("categories");

    await onShowCategory();
  };

  const onClickDeleteCategory = async (id) => {
    const { data, error } = await supabase
      .from("category")
      .delete()
      .eq("id", id);

    if (error && error.code === "23503") {
      alert("카테고리내에 상품을 모두 제거해주세요.");
      return;
    }

    onShowCategory();
  };

  const onShowCategory = async () => {
    const data = await getCategory();
    setCategoryList(data);
  };

  useEffect(() => {
    setProductCategoryId(category?.[0]?.id);
  }, [category]);

  useEffect(() => {
    onShowCategory();
  }, []);

  const onChangeCategoryName = (e) => {
    if (e.target.value.length > 7) return;
    setCategoryName(e.target.value);
  };

  const runResizedImage = async (file) => {
    const resizedImage = await resizeFile(file);
    setImage(file);
    setResizedImage(resizedImage);
    setPreviewImage(URL.createObjectURL(resizedImage));
  };

  const initProduct = () => {
    setImage(null);
    setPreviewImage(null);
    setProductName("");
    setProductPrice("");
  };

  const onDragStartProduct = (index) => {
    dragProductIndex.current = index;
  };

  const onDropProduct = async (index) => {
    if (dragProductIndex.current === index) return;

    let updatedProductList = [...product[curTab].product];
    const fromIndex = dragProductIndex.current;

    const draggedProduct = updatedProductList.splice(fromIndex, 1)[0];
    updatedProductList.splice(index, 0, draggedProduct);

    setProductList(updatedProductList);

    for (const [idx, item] of updatedProductList.entries()) {
      const { error } = await supabase
        .from("product")
        .update({ display_sort: idx })
        .eq("id", item.id);

      if (error) {
        console.error("상품 정렬에 실패했습니다.");
      }
    }

    await queryClient.invalidateQueries("products");
  };

  return (
    <Container>
      <div
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </div>
      <h1>주문 화면</h1>
      <h2>타이머</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          localStorage.setItem("prod_sec", timerValue);
          alert("타이머 변경 완료");
        }}
      >
        <input
          type="number"
          max={120}
          min={10}
          value={timerValue}
          onChange={(e) => {
            setTimerValue(e.target.value);
          }}
        />
        <button type="submit">변경</button>
      </form>
      <h1>메뉴 수정</h1>
      <h2>
        카테고리
        <p>
          <span>*</span> 최대 {MAX_CATEGORY_CNT}개<br />
        </p>
      </h2>
      <div className="category-list">
        {categoryList &&
          categoryList?.map((v, i) => (
            <div
              className={`category-item ${productCategoryId === v.id ? "active" : ""}`}
              key={i}
              draggable={true}
              onClick={() => {
                const findIndex = product.findIndex((x) => x.id === v.id);

                setCurTab(findIndex);
                setProductCategoryId(v.id);
              }}
              onDragStart={(e) => {
                dragCatrogryIndex.current = i;
              }}
              onDrag={(e) => {
                e.preventDefault();
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={async () => {
                if (dragCatrogryIndex.current === i) return;

                let _categoryList = [...categoryList];

                const fromIdx = dragCatrogryIndex.current;
                _categoryList.splice(i, 1);
                _categoryList.splice(i, 0, categoryList[fromIdx]);

                _categoryList.splice(fromIdx, 1);
                _categoryList.splice(fromIdx, 0, categoryList[i]);

                _categoryList = _categoryList.map((v, i) => {
                  return {
                    ...v,
                    display_sort: i,
                  };
                });

                setCategoryList(_categoryList);

                for (const item of _categoryList) {
                  const { error } = await supabase
                    .from("category")
                    .update({ display_sort: item.display_sort })
                    .eq("id", item.id);

                  if (error) {
                    console.error("카테고리 정렬에 실패했습니다.");
                  }
                }
              }}
            >
              <div onClick={() => {}}>{v.name}</div>
              <button
                onClick={async () => {
                  await onClickDeleteCategory(v.id);
                }}
              >
                삭제
              </button>
            </div>
          ))}
        {categoryList.length < MAX_CATEGORY_CNT && (
          <div>
            <input
              type="text"
              value={categoryName}
              onChange={onChangeCategoryName}
            />
            <button onClick={onSubmitCreateCategory}>추가</button>
          </div>
        )}
      </div>

      <table className="product-list">
        <tbody>
          {product &&
            product?.[curTab]?.product?.length > 0 &&
            product?.[curTab]?.product?.map((v, i) => (
              <tr
                key={i}
                draggable={true}
                onDragStart={() => onDragStartProduct(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDropProduct(i)}
              >
                <td>
                  <img
                    src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${v.img}`}
                  />
                </td>
                <td>{v.name}</td>
                <td>{getKRW(v.price)}원</td>
                <td>
                  <select
                    value={v.state}
                    onChange={(e) => {
                      setProductState(e.target.value);
                    }}
                  >
                    <option value="판매중">판매중</option>
                    <option value="품절">품절</option>
                    <option value="숨기기">숨기기</option>
                  </select>
                </td>
                <td
                  onClick={async () => {
                    const { data, error } = await supabase
                      .from("product")
                      .update({ is_cook: !v.is_cook })
                      .eq("id", v.id);

                    if (error) {
                      alert("조리 여부를 반영하지 못했습니다.");
                    }

                    refetch();
                  }}
                >
                  {v.is_cook ? "조리" : "비조리"}
                </td>
                <td>
                  <button
                    onClick={async () => {
                      const { data, error } = await supabase
                        .from("product")
                        .delete()
                        .eq("id", v.id);

                      if (error) {
                        alert("상품 삭제에 실패했습니다.");
                      }

                      const { data: imageData, imageError } =
                        await supabase.storage
                          .from("product-image")
                          .remove([v.img]);

                      if (imageError) {
                        alert("상품 이미지 삭제에 실패했습니다.");
                      }

                      // onShowCategory();
                      await queryClient.invalidateQueries("categories");
                      await queryClient.invalidateQueries("products");
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>상품 추가</h2>
      <label
        className={isDrag ? "active" : ""}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          runResizedImage(file);
          setIsDrag(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          setIsDrag(true);
        }}
        onDragLeave={() => {
          setIsDrag(false);
        }}
      >
        {previewImage ? (
          <img src={previewImage} />
        ) : (
          <div className="desc">
            상품 이미지를
            <br />
            드래그해주세요
          </div>
        )}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            runResizedImage(file);
          }}
        />
      </label>
      <select
        value={productCategoryId}
        onChange={(e) => {
          setProductCategoryId(e.target.value);
        }}
      >
        {category?.map((v, i) => (
          <option key={i} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
      <select
        value={productState}
        onChange={(e) => {
          setProductState(e.target.value);
        }}
      >
        <option value="판매중">판매중</option>
        <option value="품절">품절</option>
        <option value="숨기기">숨기기</option>
      </select>
      <br />
      <input
        type="text"
        value={productName}
        placeholder="상품명"
        onChange={(e) => {
          if (e.target.value.length > 18) return;
          setProductName(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="가격"
        value={productPrice}
        onChange={(e) => {
          if (e.target.value.length === 0) {
            setProductPrice("");
            return;
          }

          if (e.target.value.length > 9) return;

          let value = e.target.value.replaceAll(",", "");

          if (isNaN(value)) return;

          value = parseInt(value);

          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          setProductPrice(value);
        }}
      />
      <br />
      <button
        onClick={async () => {
          const { data: imgData, error: imgError } = await supabase.storage
            .from("product-image")
            .upload(`${Date.now()}.jpeg`, resizedImage);

          if (imgError) {
            alert("상품 이미지 등록에 실패했습니다.");
            console.error(imgData, imgError);
          }

          if (imgData) {
            const price = parseInt(productPrice.replaceAll(",", ""));

            const payload = {
              name: productName,
              img: imgData.path,
              state: productState,
              price,
              category_id: productCategoryId,
            };

            const { data: productData, error: productError } = await supabase
              .from("product")
              .insert(payload)
              .select();

            if (productData) {
              initProduct();
              alert(`${name} 상품이 등록되었습니다`);
            }
          }
        }}
      >
        업로드
      </button>
    </Container>
  );
};

export default MenuEdit;
