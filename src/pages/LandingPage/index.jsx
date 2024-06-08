import { Container } from "./styled.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { basketState } from "../../recoil/atoms/basketState.js";

import COneLogo from "/public/assets/images/c-one-logo.png";
import islandIcon from "/public/assets/images/island_icon.png";
import snackbar from "/public/assets/images/snackbar.jpg";
import { QRCodeCanvas } from "qrcode.react";
import useCornorAction from "../../hooks/useCornorAction/index.jsx";
import { modeState } from "../../recoil/atoms/modeState.js";
import { notFoundPopupState } from "../../recoil/atoms/notFoundPopupState.js";

const LandingPage = () => {
  const navigate = useNavigate();
  const resetBasketState = useResetRecoilState(basketState);
  const [handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd] =
    useCornorAction();
  const mode = useRecoilValue(modeState);

  const setNotFoundShow = useSetRecoilState(notFoundPopupState);

  const authorization = () => {
    if (mode.isQr) {
      // 최소한의 인가
      sessionStorage.removeItem("qr_token");
      setNotFoundShow(true);
    }
  };

  useEffect(() => {
    resetBasketState();
    authorization();
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

      <QRCodeCanvas
        bgColor="transparent"
        fgColor="#111f90"
        size={100}
        value={mode?.qrUrl}
        style={{ position: "absolute", left: "16px", top: "16px" }}
      />
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
