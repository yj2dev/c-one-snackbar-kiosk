import { Container } from "./styled.js";
import { Link } from "react-router-dom";

const AdminLandingPage = () => {
  return (
    <Container>
      <h1>씨원리조트 스낵바 관리자</h1>
      <div className="content">
        <Link to="/admin/order">주문 내역</Link>
        <Link to="/admin/menu">화면 관리</Link>
      </div>
      <Link className="move-landing" to="/">
        손님화면전환
      </Link>
    </Container>
  );
};

export default AdminLandingPage;
