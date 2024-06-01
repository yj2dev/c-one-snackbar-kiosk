import { Container } from "./styled.js";
import COneLogoIcon from "/public/assets/images/c-one-logo-icon.png";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { timerState } from "../../recoil/atoms/timerState.js";

const Header = () => {
  const sec = useRecoilValue(timerState);

  return (
    <Container>
      <div className="left"></div>
      <div className="title">
        <img className="c-one-logo" src={COneLogoIcon} alt="씨원리조트 로고" />
        씨원리조트 스낵바
      </div>
      <div className="right">
        <span>{sec}초</span>&nbsp;후에 처음화면으로 이동합니다
      </div>
    </Container>
  );
};

export default Header;
