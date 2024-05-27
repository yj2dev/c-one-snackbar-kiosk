import {
  BasketSection,
  Container,
  ContentSection,
  SucceedOrderPopup,
  TabSection,
  Screen,
  AlreadyItemAlert,
} from "./styled.js";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";
import Header from "../../layouts/Header/index.jsx";
import { useEffect, useRef, useState } from "react";
import { getKRW } from "../../utils/formats.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCategory, getProduct } from "../../network/request/supabase.js";
import { basketState } from "../../recoil/atoms/basketState.js";

const OrderPage = () => {
  const MIN_BASKET_ITEM_CNT = 1;
  const MAX_BASKET_ITEM_CNT = 99;

  let alreadyItemAlertId = useRef(null);

  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const resetUserState = useResetRecoilState(userState);
  const { data: category } = useQuery("categories", getCategory);
  const { data: product } = useQuery("products", getProduct);
  const [curTab, setCurTab] = useState(0);
  const [basket, setBasket] = useRecoilState(basketState);
  const [cornerState, setCornerState] = useState("");

  const [showAlreadyItemAlert, setShowAlreadyItemAlert] = useState(false);

  useEffect(() => {
    // if (!user.number || !user.gender) {
    //   navigate(-1);
    // }
  }, []);

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

  const increaseBasketItem = (index) => {
    setBasket((prevBasket) =>
      prevBasket.map((item, i) =>
        i === index ? { ...item, cnt: item.cnt + 1 } : item,
      ),
    );
  };

  const decreaseBasketItem = (index) => {
    setBasket((prevBasket) =>
      prevBasket.map((item, i) =>
        i === index
          ? { ...item, cnt: Math.max(item.cnt - 1, MIN_BASKET_ITEM_CNT) }
          : item,
      ),
    );
  };

  const deleteBasketItem = (index) => {
    setBasket((prevBasket) => prevBasket.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <AlreadyItemAlert className={showAlreadyItemAlert ? "show" : ""}>
        이미 선택된 상품입니다. 수량은 장바구니에서 조절해주세요.
      </AlreadyItemAlert>
      <Header user={user} />
      <TabSection>
        <ul>
          {product?.length > 0 &&
            product.map((v, i) => (
              <li
                key={i}
                className={i === curTab ? "active" : ""}
                value={i}
                onClick={onClickTab}
              >
                {v.name}
              </li>
            ))}
        </ul>
      </TabSection>

      <ContentSection className={cornerState}>
        {product?.length > 0 && product[curTab].product?.length > 0 ? (
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

                if (findItem) {
                  setShowAlreadyItemAlert(true);

                  if (alreadyItemAlertId.current) {
                    clearTimeout(alreadyItemAlertId.current);
                  }

                  alreadyItemAlertId.current = setTimeout(() => {
                    setShowAlreadyItemAlert(false);
                  }, 3000);

                  return;
                }

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
                      className="decrease-btn"
                      onClick={() => {
                        decreaseBasketItem(i);
                      }}
                    ></button>
                    <p>{v.cnt}</p>
                    <button
                      className="increase-btn"
                      onClick={() => {
                        increaseBasketItem(i);
                      }}
                    ></button>
                  </td>
                  <td>{getKRW(v.cnt * v.price)}원</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        deleteBasketItem(i);
                      }}
                    ></button>
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
            disabled={basket.length === 0}
            onClick={() => {
              navigate("/locker");
            }}
          >
            주문하기
          </button>
        </article>
      </BasketSection>
    </Container>
  );
};

export default OrderPage;
