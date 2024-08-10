import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const CLIENT_URL = import.meta.env.VITE_SUPABASE_CLIENT_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(CLIENT_URL, ANON_KEY);

// const CREATE_TIME_M = 10;
// const EXPIRE_TIME_M = 20;

const CREATE_TIME_M = 5;
const EXPIRE_TIME_M = 10;

export const getExpireQrToken = async () => {
  const curDate = new Date();

  // 만료기간이 지난 토큰을 삭제하고, 만료되지 않은 토큰을 가져옴
  const { data: expiredTokens, error: expiredError } = await supabase
    .from("qr_token")
    .delete()
    .lt("expires_at", curDate.toISOString())
    .select();

  const { data, error } = await supabase
    .from("qr_token")
    .select()
    .gte("expires_at", curDate.toISOString());

  if (error) {
    console.error("토큰을 가져오지 못했습니다.", error);
    return { data: [], token: [], curDate };
  }

  const sortedData = data.sort((a, b) => a.sequence - b.sequence);
  const token = sortedData.map((v) => v.token);

  return { data: sortedData, token, curDate };
};

export const validTimeOfQrToken = async (token) => {
  const curDate = new Date();

  const { data, error } = await supabase
    .from("qr_token")
    .select()
    .gte("expires_at", curDate.toISOString());

  if (error) {
    console.error("토큰을 가져오지 못했습니다.", error);
  }

  const filterData = data?.filter((v) => v.token === token);

  if (filterData.length <= 0) {
    console.error("일치하는 토큰이 없습니다");
  }

  const tokenDate = new Date(filterData[0]?.expires_at);
  let diff = tokenDate - curDate;
  diff = diff / 1000;

  return diff;
};

export const isCreateQrToken = (data, curDate) => {
  if (data.length === 0) {
    return true;
  }

  const firstToken = data.find((v) => v.sequence === 1);
  if (!firstToken) return true;

  const tokenDate = new Date(firstToken.expires_at);
  const diff = tokenDate - curDate;

  const validTime = diff / 1000 - CREATE_TIME_M * 60;
  console.log(`유효시간(${CREATE_TIME_M * 60}): ${validTime.toFixed(0)}s`);

  return diff <= 1000 * 60 * CREATE_TIME_M;
};

export const createQRToken = async () => {
  const token = uuidv4().replaceAll("-", "").substring(0, 24);
  const curTime = new Date();
  const expTime = new Date(curTime.getTime() + 1000 * 60 * EXPIRE_TIME_M);
  const isError = [];

  const curTimeStr = curTime.toISOString();
  const expTimeStr = expTime.toISOString();

  const { data: checkData, error: checkError } = await supabase
    .from("qr_token")
    .select();

  if (checkError) {
    isError.push(checkError);
  }

  // 토큰이 2개면 마지막 토큰 제거(sequence 2번 토큰)
  if (checkData.length === 2) {
    const { error: deleteError } = await supabase
      .from("qr_token")
      .delete()
      .eq("sequence", 2);
    if (deleteError) {
      isError.push(deleteError);
    }
  }

  const { error: secondError } = await supabase
    .from("qr_token")
    .update({
      sequence: 2,
    })
    .eq("sequence", 1);

  if (secondError) {
    isError.push(secondError);
  }

  const { error: firstError } = await supabase.from("qr_token").insert({
    token,
    sequence: 1,
    expires_at: expTimeStr,
    created_at: curTimeStr,
  });

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
    console.error("주문 상태를 가져오지 못했습니다.");
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

export const getOrderList = async (date = new Date()) => {
  const targetDate = new Date(date);
  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999)).toISOString();

  const { data, error } = await supabase
    .from("order")
    .select(`*, order_detail(*, product(*))`)
    .gte("created_at", startOfDay)
    .lt("created_at", endOfDay)
    .order("created_at", { ascending: false });

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

export const getSelectedProduct = async () => {
  let { data, error } = await supabase
    .from("product")
    .select(`*`)
    .eq("state", "판매중");

  if (error) throw new Error("상품을 가져오지 못했습니다.");

  return data;
};

export const getStockTrackedProducts = async () => {
  let { data, error } = await supabase
    .from("category")
    .select(`*, product(*)`)
    .eq("product.is_delete", false)
    .eq("product.is_stock_trace", true) // 재고 추적 여부가 true인 것만 가져옴
    .order("display_sort", { ascending: true });

  if (error) throw new Error("재고 추적 상품을 가져오지 못했습니다.");

  data.map((category) => {
    category.product.sort((a, b) => {
      return a.display_sort - b.display_sort;
    });
  });

  return data;
};

export const getProduct = async () => {
  let { data, error } = await supabase
    .from("category")
    .select(`*, product(*)`)
    .eq("product.is_delete", false)
    .order("display_sort", { ascending: true });

  if (error) throw new Error("상품을 가져오지 못했습니다.");

  data.map((category) => {
    category.product.sort((a, b) => {
      return a.display_sort - b.display_sort;
    });
  });

  const filterData = data.map((category) => ({
    ...category,
    product: category.product.filter((v) => v.state !== "숨기기"),
  }));

  return filterData;
};

export const getAllProduct = async () => {
  let { data, error } = await supabase
    .from("category")
    .select(`*, product(*)`)
    .eq("product.is_delete", false)
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
