import { Container } from "./styled.js";
import { Link, useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// import { v4 as uuidv4 } from "uuid";
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

  const onSubmitCreateCategory = async () => {
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
    console.log("del data >> ", data);
    onShowCategory();
  };

  const onShowCategory = async () => {
    let { data, error } = await supabase.from("category").select("*");

    console.log("data >> ", data);

    setCategoryList(data);
    console.log("error >> ", error);
  };

  useEffect(() => {
    onShowCategory();
  }, []);

  const onChangeCategoryName = (e) => {
    if (e.target.value.length > 7) return;
    setCategoryName(e.target.value);
  };

  const onClickUploadProduct = async (e) => {};

  return (
    <Container>
      <Link to="/">뒤로가기</Link>
      <h1>메뉴 편집</h1>
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
      <button onClick={onShowCategory}>카테고리 조회</button> <br />
      <input type="text" value={categoryName} onChange={onChangeCategoryName} />
      <button onClick={onSubmitCreateCategory}>카테고리 추가</button>
      <label
        className={isDrag && "active"}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          console.log("file >> ", file);
          setFile(file);
          setIsDrag(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          console.log("over");
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
      <button
        onClick={async () => {
          const resizedFile = await resizeFile(file);

          console.log("resizedFile >> ", resizedFile);

          const { data: imgData, error } = await supabase.storage
            .from("product-image")
            .upload(`${Date.now()}.jpeg`, resizedFile);
          console.log(imgData, error);

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
      상품명
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
      <select
        // defaultValue={productState}
        value={productState}
        onChange={(e) => {
          setProductState(e.target.value);
        }}
      >
        <option value="판매중">판매중</option>
        <option value="품절">품절</option>
        <option value="숨기기">숨기기</option>
      </select>
    </Container>
  );
};

export default MenuEdit;
