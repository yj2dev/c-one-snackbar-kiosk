import { Container } from "./styled.js";
import COneLogoIcon from "/public/assets/images/c-one-logo-icon.png";

const Header = () => {
  return (
    <Container>
      <div className="title">
        <img className="c-one-logo" src={COneLogoIcon} alt="씨원리조트 로고" />
        씨원리조트 스낵바
      </div>
    </Container>
  );
};

export default Header;
