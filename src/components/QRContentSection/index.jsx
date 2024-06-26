import { getKRW } from "../../utils/formats.js";
import { AlreadyItemAlert, Container } from "../ContentSection/styled.js";
import { useEffect, useRef, useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { timerState } from "../../recoil/atoms/timerState.js";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ContentSection = ({ curTab, product, basket, setBasket }) => {
  const navigate = useNavigate();

  let alreadyItemAlertId = useRef(null);
  const [cornerState, setCornerState] = useState("");
  const [showAlreadyItemAlert, setShowAlreadyItemAlert] = useState(false);

  const setSec = useSetRecoilState(timerState);
  const resetSec = useResetRecoilState(timerState);
  const timerId = useRef(null);

  // const setNotFoundShow = useSetRecoilState(notFoundPopupState);

  const toggleTimer = () => {
    resetSec();

    if (timerId.current !== null) {
      clearInterval(timerId.current);
    }

    timerId.current = setInterval(() => {
      setSec((prev) => {
        if (prev <= 1) {
          clearInterval(timerId.current);

          // setNotFoundShow(true);
          // const newToken = uuidv4().replaceAll("-", "").substring(0, 24);
          // navigate(`/${newToken}/qro`, { replace: true });
          sessionStorage.removeItem("qr_token");

          return prev - 1;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    toggleTimer();

    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    if (curTab === 0) {
      setCornerState("l-corner");
    } else if (curTab === product.length - 1) {
      setCornerState("r-corner");
    } else {
      setCornerState("");
    }
  }, [curTab]);

  return (
    <Container className={cornerState}>
      <AlreadyItemAlert className={showAlreadyItemAlert ? "show" : ""}>
        이미 선택된 상품입니다. 수량은 장바구니에서 조절해주세요.
      </AlreadyItemAlert>

      {product?.length > 0 && product[curTab].product?.length > 0 ? (
        product?.[curTab]?.product?.map((v, i) => (
          <div className="dl-wrapper">
            <dl
              className={v.state === "품절" && "sold-out"}
              key={i}
              onClick={() => {
                if (v.state === "품절") {
                  return;
                }

                toggleTimer();

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
              <dd>
                {getKRW(v.price)}
                <span className="m-none">원</span>
              </dd>
            </dl>
            {v.state === "품절" && <span className="sold-out-title">품절</span>}
          </div>
        ))
      ) : (
        <div className="center">등록된 상품이 없습니다</div>
      )}
    </Container>
  );
};

export default ContentSection;
