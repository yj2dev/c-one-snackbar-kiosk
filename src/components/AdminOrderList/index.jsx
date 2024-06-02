import {
  formatDateKR,
  formatTime,
  getGender,
  getKRW,
} from "../../utils/formats.js";
import {
  deleteOrderItem,
  updateOrderDetailComplete,
  updateOrderDetailCooking,
  updateOrderItem,
} from "../../network/request/supabase.js";

const AdminOrderList = ({ orderData, isSuccess, refetch }) => {
  return (
    <>
      {orderData
        ?.filter((v) => v.complete === isSuccess)
        .map((v, i) => (
          <div className="order-item" key={i}>
            <article className="order-info">
              {isSuccess && (
                <div className="order-detail-now">
                  {formatDateKR(v.created_at)}
                </div>
              )}
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
                  <div key={detaili} className="order-product">
                    <span
                      className={x.ready ? "ready" : ""}
                      onClick={async () => {
                        if (!x.is_cooking) {
                          await updateOrderDetailCooking(x.id, true);
                        }

                        if (x.is_cooking) {
                          await updateOrderDetailComplete(x.id, true);
                        }

                        if (x.is_cooking && x.ready) {
                          await updateOrderDetailCooking(x.id, false);
                          await updateOrderDetailComplete(x.id, false);
                        }

                        refetch();
                      }}
                    >
                      {x.product.name}&nbsp;{x.quantity}개&nbsp;
                      {!x.ready && x.is_cooking && "(조리시작)"}
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
                      const isDelete = window.confirm(`정말 삭제하시겠습니까?`);

                      if (!isDelete) return;

                      await deleteOrderItem(v.id);
                      refetch();
                    }}
                  >
                    &times;
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
      {orderData && orderData.length === 0 && (
        <div className="empty-message">
          {isSuccess
            ? "조리완료된 주문내역이 없습니다"
            : "조리중인 주문내역이 없습니다"}
        </div>
      )}
    </>
  );
};

export default AdminOrderList;
