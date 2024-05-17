import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <button className="back-btn" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <div className="user-info">
        <span className={`gender-badge ${user.gender === "남" ? "M" : "F"}`}>
          {user.gender}
        </span>
        {user.number}
      </div>
    </Container>
  );
};

export default Header;
