import { useQuery } from "react-query";
import { getProduct } from "../../network/request/supabase.js";
import { useEffect } from "react";

const usePreloadImages = () => {
  const { data } = useQuery("products", getProduct);

  useEffect(() => {
    if (data) {
      data?.forEach((item) => {
        item.product.map((v) => {
          const img = new Image();
          img.src = `${import.meta.env.VITE_STORAGE_BASE_URL}/${v.img}`;
        });
      });
    }
  }, [data]);
};

export default usePreloadImages;
