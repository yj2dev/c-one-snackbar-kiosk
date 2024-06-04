import { Container } from "./styled.js";
import { useEffect } from "react";
import { useQuery } from "react-query";
import {
  // updateOrderDetailReadyQuantity,
  getProductState,
  updateOrderDetailReadyQuantity,
} from "../../network/request/supabase.js";
import {
  orderDetailUpdateChannel,
  orderInsertChannel,
  unsubscribeChannel,
} from "../../network/request/supabaseChannels.js";

const AdminOrderState = () => {
  const { data: stateList, refetch } = useQuery(
    "orderStateList",
    getProductState,
  );

  console.log("stateList >> ", stateList);

  useEffect(() => {
    const _orderDetailUpdateChannel = orderDetailUpdateChannel(refetch);
    const _orderInsertChannel = orderInsertChannel(refetch);

    return () => {
      unsubscribeChannel([_orderDetailUpdateChannel, _orderInsertChannel]);
    };
  }, []);

  const onClickComplete = async (orderDetails) => {
    if (orderDetails.length === 0) {
      console.error("주문내역이 없습니다.");
      return;
    }
    const filterDetails = orderDetails.filter((v) => v.readyQuantity !== 0);

    if (filterDetails.length <= 0) {
      console.error("처리가능한 상태가 없습니다.");
      return;
    }

    const { orderDetailId, readyQuantity } = filterDetails.pop();

    if (readyQuantity <= 0) {
      console.error("수량은 0보다 작아질 수 없습니다.");
      return;
    }

    await updateOrderDetailReadyQuantity(orderDetailId, readyQuantity - 1);
    refetch();
  };

  const onClickCompleteAll = async (orderDetails) => {
    if (orderDetails.length === 0) {
      console.error("주문내역이 없습니다.");
      return;
    }

    const filterDetails = orderDetails.filter((v) => v.readyQuantity !== 0);

    if (filterDetails.length <= 0) {
      console.error("처리가능한 상태가 없습니다.");
      return;
    }

    for (const detail of filterDetails) {
      const { orderDetailId, readyQuantity } = detail;

      if (readyQuantity > 0) {
        await updateOrderDetailReadyQuantity(orderDetailId, 0);
      }
    }

    refetch();
  };

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <td>품목</td>
            <td>수량</td>
            <td>상태변경</td>
          </tr>
        </thead>
        <tbody>
          {stateList
            ?.filter((v) => v.quantity !== 0)
            .map((v) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.quantity}</td>
                <td>
                  <button
                    onClick={async () => {
                      await onClickComplete(v.orderDetails);
                    }}
                  >
                    1개 완료
                  </button>
                  <button
                    onClick={async () => {
                      await onClickCompleteAll(v.orderDetails);
                    }}
                  >
                    {v.quantity}개 완료
                  </button>
                </td>
              </tr>
            ))}
          {stateList?.filter((v) => v.quantity !== 0).length === 0 && (
            <tr className="not-state">
              <td colSpan="3">조리할 품목이 없습니다</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default AdminOrderState;
