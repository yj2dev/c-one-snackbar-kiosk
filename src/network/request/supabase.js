import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_CLIENT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const getCategory = async () => {
  const { data, error } = await supabase.from("category").select();
  if (error) throw new Error("카테고리를 가져오지 못했습니다.");
  return data;
};

export const getProduct = async () => {
  const { data, error } = await supabase
    .from("category")
    .select(`id, product(*)`);
  if (error) throw new Error("상품을 가져오지 못했습니다.");
  return data;
};
