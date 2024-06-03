import { Container } from "./styled.js";
import { useEffect, useRef, useState } from "react";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete.js";
import SucceedOrderPopup from "../SucceedOrderPopup/index.jsx";
import { sumCnt, sumPrice } from "../../utils/calc.js";
import supabase from "../../network/request/supabase.js";
import { useRecoilState } from "recoil";
import { basketState } from "../../recoil/atoms/basketState.js";
import { useNavigate } from "react-router-dom";

const KeyPad = ({ gender }) => {
  const keyList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0"];
  const MAX_NUMBER_LEN = 3;
  const navigate = useNavigate();

  const [basket, setBasket] = useRecoilState(basketState);
  const numberRef = useRef(null);
  const [number, setNumber] = useState("");

  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [succeedOrder, setSucceedOrder] = useState(false);
  const [landingTimer, setLandingTimer] = useState(5);

  useEffect(() => {
    numberRef.current.focus();
  }, []);

  const onChangeNumber = (e) => {
    let onlyNumber = e.target.value
      .replace(/[^0-9]/, "")
      .substring(0, MAX_NUMBER_LEN);

    if (onlyNumber.length > MAX_NUMBER_LEN) return;

    setNumber(onlyNumber);
  };

  const onClickKayPad = (value) => {
    if (value === "C") {
      setNumber("");
      return;
    }

    let onlyNumber = (number + value).substring(0, MAX_NUMBER_LEN);

    if (onlyNumber.length > MAX_NUMBER_LEN) return;

    onlyNumber = parseInt(onlyNumber) + "";

    setNumber(onlyNumber);
  };

  const onClickDelete = () => {
    setNumber(number.substring(0, number.length - 1));
  };

  const onSubmitOrder = async () => {
    if (number.length === 0) return;

    setIsOrderLoading(true);

    // 성별에 따른 유저번호 부가
    let uid = gender === "M" ? "0" : "5";
    uid += number.toString().padStart(3, "0");

    const orderPayload = {
      number,
      gender,
      uid,
      quantity: sumCnt(basket),
      price: sumPrice(basket),
    };

    const { data: orderData, error } = await supabase
      .from("order")
      .insert(orderPayload)
      .select();

    if (orderData.length === 0 || error) {
      setIsOrderLoading(false);
      console.error("주문에 실패했습니다.");
      return;
    }

    const orderDetailPayload = [];
    basket.map((v) => {
      orderDetailPayload.push({
        order_id: orderData[0].id,
        product_id: v.id,
        quantity: v.cnt,
        ready_quantity: v.cnt,
      });
    });

    const { data: detailData, error: detailError } = await supabase
      .from("order_detail")
      .insert(orderDetailPayload)
      .select("*");

    if (detailData.length === basket.length) {
      setBasket([]);
      setSucceedOrder(true);

      const landingIntervalId = setInterval(() => {
        setLandingTimer((prev) => {
          if (prev <= 1) {
            clearInterval(landingIntervalId);
            navigate("/");
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      console.error("주문이 누락되었습니다. 직원을 통해 주문해주세요.");
    }
    setIsOrderLoading(false);
  };

  return (
    <Container className={gender !== "" ? "active" : ""}>
      <input
        type="text"
        placeholder="락커키 번호"
        ref={numberRef}
        value={number}
        onChange={onChangeNumber}
        inputMode="none"
      />
      <div className="keypad">
        {keyList.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              onClickKayPad(item);
            }}
          >
            {item}
          </button>
        ))}

        <button onClick={onClickDelete}>
          <FiDelete />
        </button>
        <button
          disabled={isOrderLoading}
          className={number.length > 0 ? "active" : ""}
          onClick={() => onSubmitOrder()}
        >
          주문완료
        </button>
      </div>
      <SucceedOrderPopup
        succeedOrder={succeedOrder}
        landingTimer={landingTimer}
      />
    </Container>
  );
};

export default KeyPad;
