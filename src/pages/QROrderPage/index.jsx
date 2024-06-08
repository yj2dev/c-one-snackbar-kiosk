import { Container } from "../OrderPage/styled.js";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  getProduct,
  validTimeOfQrToken,
} from "../../network/request/supabase.js";
import { basketState } from "../../recoil/atoms/basketState.js";

import Header from "../../layouts/Header/index.jsx";
import TabSection from "../../components/TabSection/index.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { modeState } from "../../recoil/atoms/modeState.js";

import QRContentSection from "../../components/QRContentSection/index.jsx";
import QRBasketSection from "../../components/QRBasketSection/index.jsx";
import { timerState } from "../../recoil/atoms/timerState.js";
import { notFoundPopupState } from "../../recoil/atoms/notFoundPopupState.js";
import usePreloadImages from "../../hooks/usePreloadImages/index.jsx";

const QROrderPage = () => {
  usePreloadImages();

  const navigate = useNavigate();
  const { data: product } = useQuery("products", getProduct);
  const [curTab, setCurTab] = useState(0);
  const [basket, setBasket] = useRecoilState(basketState);

  const [mode, setMode] = useRecoilState(modeState);

  const setNotFoundShow = useSetRecoilState(notFoundPopupState);
  const { token: urlToken } = useParams();

  const setTimerState = useSetRecoilState(timerState);

  const initToken = () => {
    // 1. QR 모드 활성화
    setMode((prev) => ({ ...prev, isQr: true }));

    // 2. session storage 토큰 저장
    const tokenTTL = 1000 * 60 * 10;
    if (urlToken) {
      // 2-1. url에 토큰이 포함되어 있으면 session storage 에 저장
      sessionStorage.setItem("qr_token", urlToken ? urlToken : null, tokenTTL);
    } else {
      // 2-2. url에 토큰이 없으면 session storage 에 저장되어 있는지 확인
      const sessionToken = sessionStorage.getItem("qr_token");

      console.log("sessionToken >> ", sessionToken);

      if (sessionToken && mode.token.includes(sessionToken)) {
        // 2-2-1. session storage 에 토큰이 있고 서버 토큰에 포함되어 있을 때

        setNotFoundShow(false);
      } else {
        // 2-2-2. session storage 에 토큰이 없을때
        setNotFoundShow(true);
      }
    }

    // 3. url에서 토큰 정보 제거
    navigate("/qro");
  };

  useEffect(() => {
    initToken();
  }, []);

  const getToken = () => {
    if (urlToken) return urlToken;

    const sessionToken = sessionStorage.getItem("qr_token");
    if (sessionToken) return sessionToken;
  };

  useEffect(() => {
    const getTimer = async () => {
      const token = getToken();

      if (mode.token.includes(token)) {
        const validTime = await validTimeOfQrToken(token);
        setTimerState(validTime);
      }
    };

    getTimer();
  }, [urlToken, mode.token]);

  useEffect(() => {
    // if (mode.token.includes(urlToken)) {
    //   setNotFoundShow(false);
    // } else {
    //   setNotFoundShow(true);
    // }
  }, [urlToken, mode.token]);

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
    </Container>
  );
};

export default QROrderPage;
