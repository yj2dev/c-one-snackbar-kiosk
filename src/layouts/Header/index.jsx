import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";
import COneLogoIcon from "../../../public/assets/images/c-one-logo-icon.png";

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <button className="back-btn" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <div className="title">
        <img className="c-one-logo" src={COneLogoIcon} alt="씨원리조트 로고" />
        씨원리조트 스낵바
      </div>
      <div className="user-info">
        <span className={`gender-badge ${user.gender}`}>
          {user.gender === "M" ? "남" : "여"}
        </span>
        {user.number}
      </div>
    </Container>
  );
};

export default Header;
