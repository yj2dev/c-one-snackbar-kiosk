import { Container } from "./styled.js";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header/index.jsx";

const OrderPage = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <Container>
      <Header user={user} />
    </Container>
  );
};

export default OrderPage;
