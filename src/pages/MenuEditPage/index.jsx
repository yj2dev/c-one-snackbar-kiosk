import { Container } from "./styled.js";
import { Link, useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_CLIENT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const MenuEdit = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  const [categoryList, setCategoryList] = useState([]);

  const onSubmitCreateCategory = async () => {
    const { data, error } = await supabase
      .from("category")
      .insert({ name: categoryName });
    // .insert([{ name: "test-rows" }]);

    console.log("data >> ", data);
    console.log("error >> ", error);
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

  return (
    <Container>
      <Link to="/">뒤로가기</Link>
      <h1>메뉴 편집</h1>
      {categoryList &&
        categoryList.map((v, i) => (
          <div key={i}>
            {v.id} / {v.name}
          </div>
        ))}
      <button onClick={onShowCategory}>카테고리 조회</button> <br />
      <input type="text" value={categoryName} onChange={onChangeCategoryName} />
      <button onClick={onSubmitCreateCategory}>카테고리 추가</button>
    </Container>
  );
};

export default MenuEdit;
