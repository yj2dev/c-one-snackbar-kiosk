import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";
import supabase, { getOrderList } from "../../network/request/supabase.js";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { data: orderData } = useQuery("orderList", getOrderList);

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
      {orderData?.map((v, i) => (
        <div className="order-item">
          <div>
            {v.number} / {v.gender}
          </div>
          <div>{v.created_at}</div>
        </div>
      ))}
    </Container>
  );
};

export default OrderListPage;
