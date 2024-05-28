import { createClient } from "@supabase/supabase-js";

const CLIENT_URL = import.meta.env.VITE_SUPABASE_CLIENT_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(CLIENT_URL, ANON_KEY);

export const updateOrderDetailItem = async (id, isReady) => {
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
