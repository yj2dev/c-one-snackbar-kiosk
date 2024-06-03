import { Container } from "./styled.js";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import {
  updateOrderDetailReadyQuantity,
  getProductState,
} from "../../network/request/supabase.js";
import {
  orderDetailUpdateChannel,
  unsubscribeChannel,
} from "../../network/request/supabaseChannels.js";

const AdminOrderState = () => {
  const { data: stateList, refetch } = useQuery(
    "orderStateList",
    getProductState,
  );

  useEffect(() => {
    const _orderDetailUpdateChannel = orderDetailUpdateChannel(refetch);

    return () => {
      unsubscribeChannel([_orderDetailUpdateChannel]);
    };
  }, []);

  return (
    <Container>
      {stateList?.map((v) => (
        <div key={v.id}>
          {v.name} / {v.quantity}
          {v.orderDetails.map((x, i) => (
            <div
              key={i}
              onClick={async () => {
                if (x.quantity <= 0) {
                  return;
                }
                await updateOrderDetailReadyQuantity(
                  x.orderDetailId,
                  x.readyQuantity - 1,
                );

                refetch();
              }}
            >
              {x.orderDetailId} / {x.readyQuantity}
            </div>
          ))}
          <br />
        </div>
      ))}
    </Container>
  );
};

export default AdminOrderState;
