import { Container } from "./styled.js";
import { getKRW } from "../../utils/formats.js";
import { sumCnt, sumPrice } from "../../utils/calc.js";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { notFoundPopupState } from "../../recoil/atoms/notFoundPopupState.js";
import { v4 as uuidv4 } from "uuid";

const BasketSection = ({ basket, setBasket }) => {
  const navigate = useNavigate();

  const MIN_BASKET_ITEM_CNT = 1;
  const MAX_BASKET_ITEM_CNT = 32;

  const setNotFoundShow = useSetRecoilState(notFoundPopupState);

  const increaseBasketItem = (index) => {
    setBasket((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, cnt: Math.min(item.cnt + 1, MAX_BASKET_ITEM_CNT) }
          : item,
      ),
    );
  };

  const decreaseBasketItem = (index) => {
    setBasket((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, cnt: Math.max(item.cnt - 1, MIN_BASKET_ITEM_CNT) }
          : item,
      ),
    );
  };

  const deleteBasketItem = (index) => {
    setBasket((prev) => prev.filter((_, i) => i !== index));
  };

  const onClickCancel = () => {
    setNotFoundShow(true);
    const newToken = uuidv4().replaceAll("-", "").substring(0, 24);
    navigate(`/${newToken}/qro`);
  };

  const onSubmit = () => {
    navigate("/locker");
  };

  return (
    <Container>
      <article className="content">
        <table className="basket-list">
          <tbody>
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
          </tbody>
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
        <button className="cancel" onClick={() => onClickCancel()}>
          주문취소
        </button>
        <button
          className="submit"
          disabled={basket.length === 0}
          onClick={() => onSubmit()}
        >
          결제하기
        </button>
      </article>
    </Container>
  );
};

export default BasketSection;
