import { Container } from "./styled.js";
import { Link, useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { resizeFile } from "../../utils/resize.js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_CLIENT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const MenuEdit = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  const [categoryList, setCategoryList] = useState([]);

  const [isDrag, setIsDrag] = useState(false);

  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState("");
  const [productState, setProductState] = useState("판매중");
  const [productCategoryId, setProductCategoryId] = useState(0);

  console.log(categoryList.length);
  const onSubmitCreateCategory = async () => {
    if (categoryList.length >= 5) {
      alert("카테고리는 5개 까지만 등록할 수 있습니다.");
      return;
    }

    const { data, error } = await supabase
      .from("category")
      .insert({ name: categoryName });

    console.log("data >> ", data);
    console.log("error >> ", error);
    setCategoryName("");
    onShowCategory();
  };

  const onClickDeleteCategory = async (id) => {
    const { data, error } = await supabase
      .from("category")
      .delete()
      .eq("id", id);
    onShowCategory();
  };

  const onShowCategory = async () => {
    let { data, error } = await supabase.from("category").select("*");
    setCategoryList(data);
  };

  useEffect(() => {
    setProductCategoryId(categoryList?.[0]?.id);
  }, [categoryList]);

  useEffect(() => {
    onShowCategory();
  }, []);

  const onChangeCategoryName = (e) => {
    if (e.target.value.length > 7) return;
    setCategoryName(e.target.value);
  };

  return (
    <Container>
      <Link to="/">뒤로가기</Link>
      <h1>메뉴 편집</h1>
      <h2>카테고리</h2>
      <p>
        <span style={{ color: "red" }}>*</span> 최대 5가지 등록
      </p>
      {categoryList &&
        categoryList.map((v, i) => (
          <div key={i}>
            {v.id} / {v.name} /
            <button
              onClick={() => {
                onClickDeleteCategory(v.id);
              }}
            >
              -
            </button>
          </div>
        ))}
      <input type="text" value={categoryName} onChange={onChangeCategoryName} />
      <button onClick={onSubmitCreateCategory}>카테고리 추가</button>
      <hr />
      <h2>상품</h2>
      <label
        className={isDrag && "active"}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          setFile(file);
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
        Dropzone
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </label>

      <select
        value={productCategoryId}
        onChange={(e) => {
          setProductCategoryId(e.target.value);
        }}
      >
        {categoryList.map((v, i) => (
          <option key={i} value={v.id}>
            {v.name} / {v.id}
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
          const resizedFile = await resizeFile(file);

          const { data: imgData, error } = await supabase.storage
            .from("product-image")
            .upload(`${Date.now()}.jpeg`, resizedFile);

          if (imgData) {
            const price = parseInt(productPrice.replaceAll(",", ""));

            const payload = {
              name: productName,
              img: imgData.path,
              state: productState,
              price,
              category_id: productCategoryId,
            };

            console.log("payload >> ", payload);

            const { data, error } = await supabase
              .from("product")
              .insert(payload);

            console.log("data, error >> ", data, error);
          }
        }}
      >
        업로드
      </button>
    </Container>
  );
};

export default MenuEdit;
