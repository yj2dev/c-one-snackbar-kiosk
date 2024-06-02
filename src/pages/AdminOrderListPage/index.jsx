import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";
import { getOrderList } from "../../network/request/supabase.js";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import {
  orderDetailUpdateChannel,
  orderInsertChannel,
  orderUpdateChannel,
  unsubscribeChannel,
} from "../../network/request/supabaseChannels.js";
import AdminOrderList from "../../components/AdminOrderList/index.jsx";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { data: orderData, refetch } = useQuery("orderList", getOrderList);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const _orderInsertChannel = orderInsertChannel(refetch);
    const _orderUpdateChannel = orderUpdateChannel(refetch);
    const _orderDetailUpdateChannel = orderDetailUpdateChannel(refetch);

    return () => {
      unsubscribeChannel([
        _orderInsertChannel,
        _orderUpdateChannel,
        _orderDetailUpdateChannel,
      ]);
    };
  }, []);

  return (
    <Container>
      <div
        className="back-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </div>
      <h1>주문내역</h1>
      <section className="order-list">
        <ul className="tab">
          <li
            className={isSuccess ? "" : "active"}
            onClick={() => setIsSuccess(false)}
          >
            조리중
          </li>
          <li
            className={isSuccess ? "active" : ""}
            onClick={() => setIsSuccess(true)}
          >
            조리완료
          </li>
        </ul>

        <AdminOrderList
          orderData={orderData}
          isSuccess={isSuccess}
          refetch={refetch}
        />
      </section>
    </Container>
  );
};

export default OrderListPage;
