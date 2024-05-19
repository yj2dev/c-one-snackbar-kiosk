import { Container } from "./styled.js";
import COneLogo from "/public/assets/images/c-one-logo.png";
import islandIcon from "/public/assets/images/island_icon.png";
import snackbar from "/public/assets/images/snackbar.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";

const LandingPage = () => {
  const navigate = useNavigate();
  const resetUserState = useResetRecoilState(userState);

  const next = () => {
    navigate("/locker");
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
