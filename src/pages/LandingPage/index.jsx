import { Container } from "./styled.js";
import COneLogo from "/public/assets/images/c-one-logo.png";
import islandIcon from "/public/assets/images/island_icon.png";
import snackbar from "/public/assets/images/snackbar.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";
import { getProduct } from "../../network/request/supabase.js";
import { useQuery } from "react-query";

const LandingPage = () => {
  const navigate = useNavigate();
  const resetUserState = useResetRecoilState(userState);

  const { data } = useQuery("products", getProduct);

  useEffect(() => {
    data?.map((item) => {
      item.product.map((v) => {
        const img = new Image();
        img.src = `${import.meta.env.VITE_STORAGE_BASE_URL}/${v.img}`;
      });
    });

    const img = new Image();
    img.src = "";
  }, [data]);

  const next = () => {
    navigate("/order");
  };

  useEffect(() => {
    resetUserState();
  }, []);

  return (
    <Container onClick={() => next()}>
      <img className="snackbar-img" src={snackbar} alt="스낵바 배경이미지" />
      <h1>
        여기에서
        <br />
        주문하세요!
      </h1>
      {/*<button className="order-start-btn">주문 시작</button>*/}
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
