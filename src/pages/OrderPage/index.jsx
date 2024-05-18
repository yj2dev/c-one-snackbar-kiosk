import {
  BasketSection,
  Container,
  ContentSection,
  TabSection,
} from "./styled.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";
import Header from "../../layouts/Header/index.jsx";
import { useEffect, useRef, useState } from "react";
import { getKRW } from "../../utils/formats.js";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "react-query";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_CLIENT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const getCategory = async () => {
  const { data, error } = await supabase.from("category").select();
  if (error) throw new Error("카테고리를 가져오지 못했습니다.");
  return data;
};

const getProduct = async () => {
  const { data, error } = await supabase
    .from("category")
    .select(`id, product(*)`);
  if (error) throw new Error("상품을 가져오지 못했습니다.");
  return data;
};

const OrderPage = () => {
  const user = useRecoilValue(userState);
  const [curTab, setCurTab] = useState(0);

  const { data: category } = useQuery("categories", getCategory);
  // const [product, setProduct] = useState([]);
  const { data: product, isLoading } = useQuery("products", getProduct);

  const [basket, setBasket] = useState([]);

  const [cornerState, setCornerState] = useState("");

  const sumPrice = (arr) => {
    if (arr.length > 0) {
      return arr.reduce((prev, cur) => prev + cur.price, 0);
    }

    return null;
  };
  const sumCnt = (arr) => {
    if (arr.length > 0) {
      return arr.reduce((prev, cur) => prev + cur.cnt, 0);
    }

    return null;
  };

  useEffect(() => {
    console.log("basket >> ", basket);
    console.log("sumPrice(basket) >> ", sumPrice(basket));
    console.log("sumCnt(basket) >> ", sumCnt(basket));
  }, [basket]);
  useEffect(() => {}, []);

  useEffect(() => {
    if (curTab === 0) {
      setCornerState("l-corner");
    } else if (curTab === category.length - 1) {
      setCornerState("r-corner");
    } else {
      setCornerState("");
    }
  }, [curTab]);

  const onClickTab = (e) => {
    setCurTab(e.target.value);
  };

  const onSubmitOrder = () => {
    console.log("주문");

    const paylaod = {};

    console.log("payload >> ", payload);
  };

  return (
    <Container>
      <Header user={user} />

      <TabSection>
        <ul>
          {category &&
            category.map((v, i) => (
              <li
                key={i}
                className={i === curTab && "active"}
                value={i}
                onClick={onClickTab}
              >
                {v.name}
              </li>
            ))}
        </ul>
      </TabSection>

      <ContentSection className={cornerState}>
        {product && product[curTab].product.length > 0 ? (
          product?.[curTab]?.product?.map((v, i) => (
            <dl
              key={i}
              onClick={() => {
                setBasket((prev) => [
                  ...prev,
                  {
                    name: v.name,
                    price: v.price,
                    img: v.img,
                    cnt: 1,
                  },
                ]);
              }}
            >
              <img src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${v.img}`} />
              <dt>{v.name}</dt>
              <dd>{getKRW(v.price)}원</dd>
            </dl>
          ))
        ) : (
          <div className="center">등록된 상품이 없습니다</div>
        )}
      </ContentSection>

      <BasketSection>
        <div className="content">
          <table className="basket-list">
            {basket.length > 0 &&
              basket.map((v, i) => (
                <tr>
                  <td>{v.name}</td>
                  <td>{getKRW(v.price)}</td>
                  <td>{v.cnt}</td>
                  <td>{getKRW(v.cnt * v.price)}</td>
                </tr>
              ))}
            <tr>
              <td></td>
              <td></td>
              <td>{sumCnt(basket)}</td>
              <td>{getKRW(sumPrice(basket))}</td>
            </tr>
          </table>
          {basket.length === 0 && (
            <div className="center">주문할 상품을 선택해주세요</div>
          )}
        </div>
        <button onClick={onSubmitOrder}>
          {basket.length !== 0 && (
            <>
              {getKRW(sumPrice(basket))}원 <br />
            </>
          )}
          주문하기
        </button>
      </BasketSection>
    </Container>
  );
};

export default OrderPage;
