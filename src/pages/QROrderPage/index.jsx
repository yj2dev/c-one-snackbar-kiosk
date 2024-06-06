import { Container } from "../OrderPage/styled.js";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getProduct } from "../../network/request/supabase.js";
import { basketState } from "../../recoil/atoms/basketState.js";

import Header from "../../layouts/Header/index.jsx";
import TabSection from "../../components/TabSection/index.jsx";
import ContentSection from "../../components/ContentSection/index.jsx";
import BasketSection from "../../components/QRBasketSection/index.jsx";
import { useParams } from "react-router-dom";
import { modeState } from "../../recoil/atoms/modeState.js";
import QRNotFoundPopup from "../../components/QRNotFoundPopup/index.jsx";
import QRContentSection from "../../components/QRContentSection/index.jsx";
import QRBasketSection from "../../components/QRBasketSection/index.jsx";
import { timerState } from "../../recoil/atoms/timerState.js";

const QROrderPage = () => {
  const { data: product } = useQuery("products", getProduct);
  const [curTab, setCurTab] = useState(0);
  const [basket, setBasket] = useRecoilState(basketState);

  const [mode, setMode] = useRecoilState(modeState);
  const [notFoundShow, setNotFoundShow] = useState(false);
  const { token } = useParams();

  const setTimerState = useSetRecoilState(timerState);

  useEffect(() => {
    setTimerState(60 * 5);
  }, []);

  useEffect(() => {
    console.log(mode.token);
    console.log(mode.token.includes(token));
    if (mode.token.includes(token)) {
      setMode((prev) => ({ ...prev, isQr: true }));
      setNotFoundShow(false);
    } else {
      setNotFoundShow(true);
    }
  }, [mode.token]);

  return (
    <Container>
      <Header />
      <TabSection product={product} curTab={curTab} setCurTab={setCurTab} />
      <QRContentSection
        curTab={curTab}
        product={product}
        basket={basket}
        setBasket={setBasket}
      />
      <QRBasketSection basket={basket} setBasket={setBasket} />
      <QRNotFoundPopup show={notFoundShow} />
    </Container>
  );
};

export default QROrderPage;
