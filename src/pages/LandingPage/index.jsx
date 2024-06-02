import { Container } from "./styled.js";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { getProduct } from "../../network/request/supabase.js";
import { basketState } from "../../recoil/atoms/basketState.js";

import COneLogo from "/public/assets/images/c-one-logo.png";
import islandIcon from "/public/assets/images/island_icon.png";
import snackbar from "/public/assets/images/snackbar.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const resetBasketState = useResetRecoilState(basketState);

  const { data } = useQuery("products", getProduct);

  const timerRef = useRef(null);

  const preLoadImg = () => {
    data?.map((item) => {
      item.product.map((v) => {
        const img = new Image();
        img.src = `${import.meta.env.VITE_STORAGE_BASE_URL}/${v.img}`;
      });
    });
  };

  useEffect(() => {
    preLoadImg();
  }, []);

  const next = () => {
    navigate("/order");
  };

  useEffect(() => {
    resetBasketState();
  }, []);

  const handleMouseDown = (e) => {
    if (e.clientX < 50 && e.clientY < 50) {
      timerRef.current = setTimeout(() => {
        navigate("/admin");
      }, 1000);
    }
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (touch.clientX < 50 && touch.clientY < 50) {
      timerRef.current = setTimeout(() => {
        navigate("/admin");
      }, 1000);
    }
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <Container
      onClick={() => next()}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img className="snackbar-img" src={snackbar} alt="스낵바 배경이미지" />
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
