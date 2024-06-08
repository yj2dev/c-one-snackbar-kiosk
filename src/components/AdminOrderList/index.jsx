import {
  formatDateKR,
  formatTime,
  getGender,
  getKRW,
} from "../../utils/formats.js";
import {
  deleteOrderItem,
  updateOrderDetailComplete,
  updateOrderItem,
} from "../../network/request/supabase.js";
import { useState } from "react";

const AdminOrderList = ({ orderData, isSuccess, refetch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const filterOrderData = orderData?.filter((v) =>
    v.uid.includes(searchKeyword),
  );

  return (
    <>
      <div className="search-orderlist">
        <input
          type="text"
          placeholder="라커키로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        {searchKeyword.length > 0 && (
          <button
            className="delete-btn"
            onClick={() => {
              setSearchKeyword("");
            }}
          />
        )}
      </div>
      {filterOrderData?.filter((v) => v.complete === isSuccess).length !==
        0 && (
        <div className="orderlist-cnt">
          {filterOrderData?.filter((v) => v.complete === isSuccess).length}건
        </div>
      )}
      {filterOrderData
        ?.filter((v) => v.complete === isSuccess)
        .map((v, i) => (
          <div className="order-item" key={i}>
            <article className="order-info">
              {isSuccess && (
                <div className="order-detail-now">
                  {formatDateKR(v.created_at)}
                  <br />
                  {v.is_qr ? "QR 주문" : "키오스크 주문"}
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
                        await updateOrderDetailComplete(x.id, !x.ready);

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
      {filterOrderData &&
        filterOrderData.filter((v) => v.complete === isSuccess).length === 0 &&
        (searchKeyword.length !== 0 ? (
          <div className="empty-message">
            {searchKeyword}로 검색된 내용이 없습니다
          </div>
        ) : (
          <div className="empty-message">
            {isSuccess
              ? "조리완료된 주문내역이 없습니다"
              : "등록된 주문이 없습니다"}
          </div>
        ))}
    </>
  );
};

export default AdminOrderList;
