import { Container } from "./styled.js";
import { Link } from "react-router-dom";

const AdminLandingPage = () => {
  return (
    <Container>
      <Link to="/admin/order">주문 내역</Link> <br />
      <Link to="/admin/menu">메뉴 수정</Link>
    </Container>
  );
};

export default AdminLandingPage;
