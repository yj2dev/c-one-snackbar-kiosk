import { Container } from "./styled.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";

import { createQRToken } from "../../network/request/supabase.js";
import { basketState } from "../../recoil/atoms/basketState.js";

import COneLogo from "/public/assets/images/c-one-logo.png";
import islandIcon from "/public/assets/images/island_icon.png";
import snackbar from "/public/assets/images/snackbar.jpg";
import { QRCodeCanvas } from "qrcode.react";
import useCornorAction from "../../hooks/useCornorAction/index.jsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const resetBasketState = useResetRecoilState(basketState);
  const [handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd] =
    useCornorAction();

  const [QRURL, setQRURL] = useState("");

  const generateQRCode = async () => {
    const token = await createQRToken();
    let url = null;

    if (import.meta.env.MODE === "production") {
      const baseUrl = import.meta.env.VITE_QR_BASE_URL;
      url = `${baseUrl}/${token}/qro`;
    } else {
      url = `http://localhost:5173/${token}/qro`;
    }

    console.log(url);

    if (token) {
      setQRURL(url);
    }
  };

  useEffect(() => {
    resetBasketState();

    generateQRCode();

    const genQRId = setInterval(generateQRCode, 1000 * 60 * 10);

    return () => clearInterval(genQRId);
  }, []);

  return (
    <Container
      onClick={() => navigate("/order")}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img className="snackbar-img" src={snackbar} alt="스낵바 배경이미지" />

      {/*<QRCodeCanvas bgColor="transparent" size={84} value={QRURL} />*/}
      <h1>
        여기에서
        <br />
        주문하세요!
      </h1>
      <img className="c-one-logo" src={COneLogo} alt="씨원리조트 로고" />
      <p>
        <img
          className="island-icon"
          src={islandIcon}
          alt="씨원리조트 부대시설 섬 아이콘"
        />
        [ La Pool : Adventure Waterpark & Sauna ]
      </p>
      <span>화면을 터치하세요</span>
    </Container>
  );
};

export default LandingPage;
