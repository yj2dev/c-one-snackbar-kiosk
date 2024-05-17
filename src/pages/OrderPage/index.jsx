import { Container, ContentSection, TabSection } from "./styled.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";
import Header from "../../layouts/Header/index.jsx";
import { useEffect, useRef, useState } from "react";
import { getKRW } from "../../utils/formats.js";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "react-query";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_CLIENT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const getCategory = async () => {
  const { data, error } = await supabase.from("category").select();
  if (error) throw new Error("카테고리를 가져오지 못했습니다.");
  return data;
};

const OrderPage = () => {
  const user = useRecoilValue(userState);
  const [curTab, setCurTab] = useState(0);

  const { data: category } = useQuery("categories", getCategory);

  const product = [
    {
      img: "http://placehold.it/200x200",
      name: "닭강정1",
      price: getKRW(3500),
    },
    {
      img: "http://placehold.it/200x200",
      name: "콩",
      price: getKRW(35000),
    },
    {
      img: "http://placehold.it/100x50",
      name: "김치",
      price: getKRW(300),
    },
    {
      img: "http://placehold.it/200x200",
      name: "닭강정 옥수수 땅콩",
      price: getKRW(123500),
    },
    {
      img: "http://placehold.it/200x200",
      name: "닭강정입니다",
      price: getKRW(3500),
    },
    {
      img: null,
      name: "치킨너겟입니다",
      price: getKRW(3500),
    },
    {
      img: "http://placehold.it/200x200",
      name: "아이스크림",
      price: getKRW(3500),
    },
  ];

  const onClickTab = (e) => {
    setCurTab(e.target.value);
  };
  return (
    <Container>
      <Header user={user} />

      <TabSection>
        <ul>
          {category &&
            category.map((v, i) => (
              <li
                key={i}
                className={i === curTab && "active"}
                value={i}
                onClick={onClickTab}
              >
                {v.name}
              </li>
            ))}
        </ul>
      </TabSection>

      <ContentSection>
        {product &&
          product.map((v, i) => (
            <dl key={i}>
              <img src={v.img} />
              <dt>{v.name}</dt>
              <dd>{v.price}원</dd>
            </dl>
          ))}
      </ContentSection>
    </Container>
  );
};

export default OrderPage;
