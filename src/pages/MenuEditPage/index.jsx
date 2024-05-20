import { Container } from "./styled.js";
import { Link, useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { resizeFile } from "../../utils/resize.js";
import { useQuery } from "react-query";
import { getCategory, getProduct } from "../../network/request/supabase.js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_CLIENT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const MenuEdit = () => {
  const { data: category } = useQuery("categories", getCategory);
  const { data: product } = useQuery("products", getProduct);

  const [resizedImage, setResizedImage] = useState(null);

  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  const [isDrag, setIsDrag] = useState(false);
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState("");
  const [productState, setProductState] = useState("판매중");
  const [productCategoryId, setProductCategoryId] = useState(null);

  const [categoryList, setCategoryList] = useState([]);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [curTab, setCurTab] = useState(0);

  const onSubmitCreateCategory = async () => {
    if (categoryName.trim().length === 0) {
      alert("내용을 입력하세요.");
      return;
    }

    if (category.length >= 5) {
      alert("카테고리는 5개 까지만 등록할 수 있습니다.");
      return;
    }

    const { data, error } = await supabase
      .from("category")
      .insert({ name: categoryName });

    setCategoryName("");
    onShowCategory();
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
    let { data, error } = await supabase.from("category").select("*");
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

  return (
    <Container>
      <div
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </div>
      <h1>메뉴 수정</h1>
      <h2>
        카테고리
        <p>
          <span>*</span> 최대 5가지 등록
        </p>
      </h2>
      <div className="category-list">
        {category &&
          category?.map((v, i) => (
            <div className="category" key={i}>
              <div onClick={() => {}}>{v.name}</div>
              <button
                onClick={() => {
                  onClickDeleteCategory(v.id);
                }}
              >
                -
              </button>
            </div>
          ))}
        <div>
          <input
            type="text"
            value={categoryName}
            onChange={onChangeCategoryName}
          />
          <button onClick={onSubmitCreateCategory}>+</button>
        </div>
      </div>

      {product && product?.[curTab]?.product.length > 0 ? (
        product?.[curTab]?.product?.map((v, i) => (
          <div className="product-item" key={i}>
            {v.name}/ {v.price} / {v.img}
          </div>
        ))
      ) : (
        <>undefined</>
      )}

      <hr />
      <h2>상품 추가</h2>
      <label
        className={isDrag && "active"}
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
          if (e.target.value.length > 7) return;
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
          console.log(resizedImage);
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

            console.log(productData, productError);

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
