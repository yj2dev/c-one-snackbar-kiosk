import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";
import supabase, {
  deleteOrderItem,
  getOrderList,
  updateOrderItem,
} from "../../network/request/supabase.js";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { formatKR, getGender, getKRW, nowDate } from "../../utils/formats.js";
import alertSoundSrc from "/public/assets/sounds/alert_sound.wav";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { data: orderData, refetch } = useQuery("orderList", getOrderList);

  const playAlertSound = () => {
    const audio = new Audio(alertSoundSrc);
    audio.play();
  };

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "order",
        },
        (payload) => {
          playAlertSound();
          refetch();
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [refetch]);

  return (
    <Container>
      <button
        onClick={() => {
          refetch();
          playAlertSound();
        }}
      >
        새로고침
      </button>
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
        {orderData?.map((v, i) => (
          <div className="order-item" key={i}>
            <article className="order-info">
              <div className="order-now">
                {nowDate(v.created_at)}
                {/*{formatKR(v.created_at)}*/}
              </div>
              <div className="order-user">
                <span
                  className={`gender-badge ${v.gender === "M" ? "M" : "F"}`}
                >
                  {getGender(v.gender)}
                </span>
                {v.number}
              </div>

              <span className="order-uid">({v.uid})</span>
            </article>

            <article className="order-detail">
              <div className="order-title">
                [메뉴&nbsp;{v.quantity}개]&nbsp;{getKRW(v.price)}원
              </div>

              <div className="order-product">
                {v.order_detail.map((x, i) => (
                  <>
                    {i === 0 ? "" : " / "}
                    {x.product.name}&nbsp;{x.quantity}개
                  </>
                ))}
              </div>

              <div className="order-state">
                {v.complete ? "준비완료" : "준비중"}
              </div>
            </article>
            {/*<button*/}
            {/*  onClick={async () => {*/}
            {/*    await deleteOrderItem(v.id);*/}
            {/*    refetch();*/}
            {/*  }}*/}
            {/*>*/}
            {/*  삭제*/}
            {/*</button>*/}
            <button
              onClick={async () => {
                await updateOrderItem(v.id, true);
                refetch();
              }}
            >
              준비완료
            </button>
          </div>
        ))}
      </section>
    </Container>
  );
};

export default OrderListPage;
