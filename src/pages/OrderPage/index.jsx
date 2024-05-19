import {
  BasketSection,
  Container,
  ContentSection,
  SucceedOrderPopup,
  TabSection,
} from "./styled.js";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";
import Header from "../../layouts/Header/index.jsx";
import { useEffect, useRef, useState } from "react";
import { getKRW } from "../../utils/formats.js";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { IoClose } from "@react-icons/all-files/io5/IoClose.js";
import { IoRemove } from "@react-icons/all-files/io5/IoRemove.js";
import { IoAdd } from "@react-icons/all-files/io5/IoAdd.js";

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
  const MIN_BASKET_ITEM_CNT = 1;
  const MAX_BASKET_ITEM_CNT = 99;

  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const resetUserState = useResetRecoilState(userState);
  const { data: category } = useQuery("categories", getCategory);
  const { data: product, isLoading } = useQuery("products", getProduct);
  const [curTab, setCurTab] = useState(0);
  const [basket, setBasket] = useState([]);
  const [cornerState, setCornerState] = useState("");
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [succeedOrder, setSucceedOrder] = useState(false);

  const sumPrice = (arr) => {
    if (arr.length > 0) {
      return arr.reduce((prev, cur) => prev + cur.price * cur.cnt, 0);
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
    if (!user.number || !user.gender) {
      navigate(-1);
    }
  }, []);

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

  const onSubmitOrder = async () => {
    const orderPayload = {
      number: user.number,
      gender: user.gender,
    };

    const { data: orderData, error: orderError } = await supabase
      .from("order")
      .insert(orderPayload)
      .select();

    if (orderData.length === 0) return;

    const orderDetailPayload = [];
    basket.map((v) => {
      orderDetailPayload.push({
        order_id: orderData[0].id,
        product_id: v.id,
        quantity: v.cnt,
      });
    });

    const { data: detailData, error: detailError } = await supabase
      .from("order_detail")
      .insert(orderDetailPayload)
      .select();

    if (detailData.length > 0) {
      setBasket([]);
      setSucceedOrder(true);
    }
  };

  const increaseBasketItem = (index) => {
    const _basket = [...basket];
    if (_basket[index].cnt < MAX_BASKET_ITEM_CNT) {
      _basket[index].cnt += 1;
    }
    setBasket([..._basket]);
  };

  const decreaseBasketItem = (index) => {
    const _basket = [...basket];

    if (_basket[index].cnt > MIN_BASKET_ITEM_CNT) {
      _basket[index].cnt -= 1;
    }
    setBasket(_basket);
  };

  const deleteBasketItem = (index) => {
    let _basket = [...basket];
    _basket.splice(index, 1);
    setBasket(_basket);
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
                const item = {
                  cnt: 1,
                  id: v.id,
                  name: v.name,
                  price: v.price,
                };

                const findItem = basket.find((item) => item.id === v.id);

                if (findItem) return;

                setBasket((prev) => [...prev, item]);
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

      <button
        onClick={() => {
          setSucceedOrder((prev) => !prev);
        }}
      >
        toggle
      </button>
      <BasketSection>
        <article className="content">
          <table className="basket-list">
            {basket.length > 0 &&
              basket.map((v, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{v.name}</td>
                  <td>
                    <button
                      onClick={() => {
                        decreaseBasketItem(i);
                      }}
                    >
                      <IoRemove />
                    </button>
                    <p>{v.cnt}</p>
                    <button
                      onClick={() => {
                        increaseBasketItem(i);
                      }}
                    >
                      <IoAdd />
                    </button>
                  </td>
                  <td>{getKRW(v.cnt * v.price)}원</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteBasketItem(i);
                      }}
                    >
                      <IoClose />
                    </button>
                  </td>
                </tr>
              ))}
          </table>
          {basket.length === 0 && (
            <div className="center">주문할 상품을 선택해주세요</div>
          )}
        </article>
        <article className="order-info">
          <div className="info">
            <p>
              <span>수량</span>
              {sumCnt(basket) || 0}&nbsp;개
              <br />
            </p>
            <p>
              <span>금액</span>
              {getKRW(sumPrice(basket)) || 0}&nbsp;원
              <br />
            </p>
          </div>
          <button
            className="cancel"
            onClick={() => {
              resetUserState();
              navigate("/");
            }}
          >
            주문취소
          </button>
          <button
            className="submit"
            disabled={basket.length === 0 || isOrderLoading}
            onClick={onSubmitOrder}
          >
            주문하기
          </button>
        </article>
      </BasketSection>
      <SucceedOrderPopup className={succeedOrder && "show"}>
        주문이 완료되었습니다.
      </SucceedOrderPopup>
    </Container>
  );
};

export default OrderPage;
