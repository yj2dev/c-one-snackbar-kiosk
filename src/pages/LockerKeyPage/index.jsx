import { Container } from "./styled.js";
import { useEffect, useRef, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";
import supabase from "../../network/request/supabase.js";
import { Screen, SucceedOrderPopup } from "../OrderPage/styled.js";
import { basketState } from "../../recoil/atoms/basketState.js";

const LockerKeyPage = () => {
  const navigate = useNavigate();
  const numberRef = useRef(null);
  const keyList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0"];

  const [number, setNumber] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  const [basket, setBasket] = useRecoilState(basketState);

  const MAX_NUMBER_LEN = 3;

  const [gender, setGender] = useState("");

  const [landingTimer, setLandingTimer] = useState(5);
  const [succeedOrder, setSucceedOrder] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  useEffect(() => {
    numberRef.current.focus();
    setGender(user.gender);
    setNumber(user.number);
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

  const onClickReset = () => {
    // resetUserState();
    navigate(-1);
  };

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

  const onSubmitOrder = async () => {
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
      });
    });

    const { data: detailData } = await supabase
      .from("order_detail")
      .insert(orderDetailPayload)
      .select();

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
    <Container>
      <button className="back-btn" onClick={onClickReset}>
        뒤로가기
      </button>
      <h1 className={gender !== "" ? "hidden" : ""}>
        <span>락커키 정보</span>를
        <br />
        입력해주세요
      </h1>

      <ul className={`select-gender ${gender !== "" ? "hidden" : ""}`}>
        <li
          className={gender === "M" ? "active" : ""}
          onClick={() => setGender("M")}
        >
          남자
        </li>
        <li
          className={gender === "F" ? "active" : ""}
          onClick={() => setGender("F")}
        >
          여자
        </li>
      </ul>
      <h2 className={`show-select-gender ${gender !== "" ? "hidden" : ""}`}>
        성별을 선택해주세요
      </h2>
      <div className={`show-input-locker ${gender !== "" ? "active" : ""}`}>
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
            <FaDeleteLeft />
          </button>
          <button
            className={number.length > 0 ? "active" : ""}
            onClick={() => {
              if (number === "") return;
              if (number === 0) return;

              setUser({ number, gender });
              // navigate("/order");

              onSubmitOrder();
            }}
          >
            주문완료
          </button>
        </div>
      </div>
      <SucceedOrderPopup
        className={succeedOrder ? "show" : ""}
        onClick={() => {
          navigate("/");
        }}
      >
        <p>주문이 완료되었습니다</p>
        <p>음식이 준비되면 락커키 번호로 불러드리겠습니다</p>
        <p className="landing-timer">
          화면을 터치하거나 {landingTimer}초 후에 <br />
          처음화면으로 이동합니다
        </p>
      </SucceedOrderPopup>
      <Screen className={succeedOrder ? "show" : ""} />
    </Container>
  );
};

export default LockerKeyPage;
