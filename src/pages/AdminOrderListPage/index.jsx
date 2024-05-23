import { Container } from "./styled.js";
import { useNavigate } from "react-router-dom";
import supabase, {
  deleteOrderItem,
  getOrderList,
  updateOrderDetailItem,
  updateOrderItem,
} from "../../network/request/supabase.js";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  formatKR,
  formatTime,
  getGender,
  getKRW,
  nowDate,
} from "../../utils/formats.js";
import alertSoundSrc from "/public/assets/sounds/alert_sound.wav";
import { IoClose } from "@react-icons/all-files/io5/IoClose.js";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { data: orderData, refetch } = useQuery("orderList", getOrderList);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const toggleSuccess = async (orderId, success) => {
    await updateOrderItem(orderId, success);
    refetch();
  };

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

        {orderData
          ?.filter((v) => v.complete === isSuccess)
          .map((v, i) => (
            <div className="order-item" key={i}>
              <article className="order-info">
                <div className="order-now">{formatTime(v.created_at)}</div>
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

                <div className="order-product-container">
                  {v.order_detail.map((x, detaili) => (
                    <div className="order-product">
                      <span
                        key={detaili}
                        className={x.ready ? "ready" : ""}
                        onClick={async () => {
                          await updateOrderDetailItem(x.id, !x.ready);
                          refetch();
                        }}
                      >
                        {/*{i === 0 ? "" : " / "}*/}
                        {x.product.name}&nbsp;{x.quantity}개
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              {v.complete ? (
                <>
                  <article className="btn">
                    <button
                      onClick={async () => {
                        const isConfirm =
                          window.confirm("완료된 주문을 복구하시겠습니까?");

                        if (!isConfirm) return;

                        await updateOrderItem(v.id, false);
                        refetch();
                      }}
                    >
                      복구
                    </button>
                  </article>
                  <div className="delete-btn-container">
                    <button
                      className="delete-btn"
                      onClick={async () => {
                        const isDelete =
                          window.confirm(`정말 삭제하시겠습니까?`);

                        if (!isDelete) return;

                        await deleteOrderItem(v.id);
                        refetch();
                      }}
                    >
                        &times;
                      {/*<IoClose*/}
                      {/*  stlye={{*/}
                      {/*    width: "100%",*/}
                      {/*    height: "100%",*/}
                      {/*  }}*/}
                      {/*/>*/}
                    </button>
                  </div>
                </>
              ) : (
                <article className="btn">
                  <button
                    onClick={async () => {
                      await updateOrderItem(v.id, true);
                      refetch();
                    }}
                  >
                    조리 <br />
                    완료
                  </button>
                </article>
              )}
            </div>
          ))}
        {/* 주문내역이 없을 경우 메시지 표시 */}
        {orderData && orderData.length === 0 && (
          <div className="empty-message">
            {isSuccess
              ? "조리완료된 주문내역이 없습니다"
              : "조리중인 주문내역이 없습니다"}
          </div>
        )}
      </section>
    </Container>
  );
};

export default OrderListPage;
