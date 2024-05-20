import { createClient } from "@supabase/supabase-js";

const CLIENT_URL = import.meta.env.VITE_SUPABASE_CLIENT_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(CLIENT_URL, ANON_KEY);

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
