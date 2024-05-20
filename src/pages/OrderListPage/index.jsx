import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";

const OrderListPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </div>
      <h1>주문내역</h1>
    </Container>
  );
};

export default OrderListPage;
