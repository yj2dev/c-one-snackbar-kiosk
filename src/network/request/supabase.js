import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const CLIENT_URL = import.meta.env.VITE_SUPABASE_CLIENT_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(CLIENT_URL, ANON_KEY);

// const CREATE_TIME_M = 10;
// const EXPIRE_TIME_M = 20;

const CREATE_TIME_M = 5;
const EXPIRE_TIME_M = 10;

export const validateQRToken = async () => {
  const curDate = new Date().toISOString();

  const { data, error } = await supabase
    .from("qr_token")
    .select()
    .lte("expires_at", curDate);

  console.log("valid >> ", data, error);
};

export const getQrToken = async () => {
  const curDate = new Date();

  // 만료기간이 지난 토큰은 제외하고 가져옴
  const { data, error } = await supabase
    .from("qr_token")
    .select()
    .gte("expires_at", curDate.toISOString());

  const sortData = data.sort((a, b) => a.sequence - b.sequence);
  const token = sortData.map((v) => v.token);

  return { data, token, curDate };
};

export const isCreateQrToken = (data, curDate) => {
  const firstToken = data.filter((v) => v.sequence === 1);

  console.log("firstToken", firstToken);

  const tokenDate = new Date(firstToken[0].expires_at);
  const diff = tokenDate - curDate;

  const lastTime = diff / 1000 - CREATE_TIME_M * 60;
  console.log(
    `남은시간(${CREATE_TIME_M * 60}): ${lastTime.toFixed(2)}s, ${diff} -> ${CREATE_TIME_M * 60 * 1000}`,
  );

  if (diff <= 1000 * 60 * CREATE_TIME_M) {
    //   만료시간과 현재 시간의 차가 내가 설정한 생성 시간이 일치할때
    console.log("재 생성");
    return true;
  } else {
    console.log("유지");
    return false;
  }
};

export const createQRToken = async () => {
  let token = uuidv4();
  token = token.replaceAll("-", "").substring(0, 24);
  let curTime = new Date();
  let expTime = new Date(curTime.getTime() + 1000 * 60 * EXPIRE_TIME_M);
  let isError = [];

  curTime = curTime.toISOString();
  expTime = expTime.toISOString();

  const { data: checkData, error: checkError } = await supabase
    .from("qr_token")
    .select();

  if (checkError) {
    isError.push(checkError);
  }

  // 토큰이 2개면 마지막 토큰 제거(sequence 2번 토큰)
  if (checkData.length === 2) {
    const { data: deleteData, error: deleteError } = await supabase
      .from("qr_token")
      .delete()
      .eq("sequence", 2)
      .select();
  }

  const { data: secondData, error: secondError } = await supabase
    .from("qr_token")
    .update({
      sequence: 2,
    })
    .eq("sequence", 1)
    .select();

  if (secondError) {
    isError.push(secondError);
  }

  const { data: firstData, error: firstError } = await supabase
    .from("qr_token")
    .insert({
      token,
      sequence: 1,
      expires_at: expTime,
      created_at: curTime,
    })
    .select();

  if (firstError) {
    isError.push(firstError);
  }

  if (isError.length !== 0) {
    console.error("QR Token을 생성하지 못했습니다.", isError);
    return null;
  }

  return token;
};
export const updateOrderDetailReadyQuantity = async (id, cnt) => {
  if (cnt < 0) {
    console.error("올바를 숫자를 입력해주세요.");
    return;
  }

  const { data, error } = await supabase
    .from("order_detail")
    .update({ ready_quantity: cnt })
    .eq("id", id)
    .select();

  if (error) console.error("상품 준비 개수를 변경하지 못했습니다.");

  return data;
};

export const getProductState = async () => {
  const { data, error } = await supabase
    .from("order")
    .select("*, order_detail(*, product(*))")
    .eq("complete", false);

  if (error) {
    console.error("상품 상태를 가져오지 못했습니다.");
    return [];
  }

  const filteredData = data
    .map((order) => {
      return {
        ...order,
        order_detail: order.order_detail.filter(
          (detail) => detail.product.is_cook,
        ),
      };
    })
    .filter((order) => order.order_detail.length > 0);

  const productMap = new Map();

  filteredData.forEach((order) => {
    order.order_detail.forEach((detail) => {
      const productId = detail.product_id;
      const productName = detail.product.name;
      const quantity = detail.ready_quantity;

      if (productMap.has(productId)) {
        productMap.get(productId).quantity += quantity;
        productMap.get(productId).orderDetails.push({
          orderDetailId: detail.id,
          readyQuantity: detail.ready_quantity,
        });
      } else {
        productMap.set(productId, {
          id: productId,
          name: productName,
          quantity: quantity,
          orderDetails: [
            {
              orderDetailId: detail.id,
              readyQuantity: detail.ready_quantity,
            },
          ],
        });
      }
    });
  });

  let result = Array.from(productMap.values());
  result = result.sort((a, b) => a.id - b.id);

  return result;
};

export const updateOrderDetailCooking = async (id, isCooking) => {
  const { data, error } = await supabase
    .from("order_detail")
    .update({ is_cooking: isCooking })
    .eq("id", id);
  if (error) console.error("상품 상태를 변경하지 못했습니다.");

  return data;
};

export const updateOrderDetailComplete = async (id, isReady) => {
  const { data, error } = await supabase
    .from("order_detail")
    .update({ ready: isReady })
    .eq("id", id);
  if (error) console.error("상품 상태를 변경하지 못했습니다.");

  return data;
};

export const updateOrderItem = async (id, isComplete) => {
  const { data, error } = await supabase
    .from("order")
    .update({ complete: isComplete })
    .eq("id", id);
  if (error) console.error("주문 상태를 변경하지 못했습니다.");

  return data;
};

export const deleteOrderItem = async (id) => {
  const { data, error } = await supabase.from("order").delete().eq("id", id);
  if (error) console.error("주문 항목을 삭제하지 못했습니다.");

  return data;
};

export const getOrderList = async () => {
  const { data, error } = await supabase
    .from("order")
    .select(`*, order_detail(*, product(*))`)
    .order("created_at", { ascending: false });
  // .range(0, 10);

  if (error) console.error("주문 목록을 가져오지 못했습니다.");

  // 상품 아이디순으로 오름차순 정렬
  data.map((v) => v.order_detail.sort((a, b) => a.id - b.id));

  return data;
};

export const getCategory = async () => {
  const { data, error } = await supabase
    .from("category")
    .select()
    .order("display_sort", { ascending: true });
  if (error) throw new Error("카테고리를 가져오지 못했습니다.");
  return data;
};

export const getProduct = async () => {
  let { data, error } = await supabase
    .from("category")
    .select(`*, product(*)`)
    .order("display_sort", { ascending: true });

  if (error) throw new Error("상품을 가져오지 못했습니다.");

  data.map((category) => {
    category.product.sort((a, b) => {
      return a.display_sort - b.display_sort;
    });
  });

  return data;
};

export default supabase;
