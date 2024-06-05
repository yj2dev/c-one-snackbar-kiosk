import { Container } from "../OrderPage/styled.js";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { getProduct } from "../../network/request/supabase.js";
import { basketState } from "../../recoil/atoms/basketState.js";

import Header from "../../layouts/Header/index.jsx";
import TabSection from "../../components/TabSection/index.jsx";
import ContentSection from "../../components/ContentSection/index.jsx";
import BasketSection from "../../components/BasketSection/index.jsx";

const QRorderPage = () => {
  const { data: product } = useQuery("products", getProduct);
  const [curTab, setCurTab] = useState(0);
  const [basket, setBasket] = useRecoilState(basketState);

  return (
    <Container>
      <Header />
      <TabSection product={product} curTab={curTab} setCurTab={setCurTab} />
      <ContentSection
        curTab={curTab}
        product={product}
        basket={basket}
        setBasket={setBasket}
      />
      <BasketSection basket={basket} setBasket={setBasket} />
    </Container>
  );
};

export default QRorderPage;
