import { Container } from "./styled.js";
import { useEffect, useRef, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms/userState.js";
import { getGender } from "../../utils/formats.js";

const LockerKeyPage = () => {
  const navigate = useNavigate();
  const numberRef = useRef(null);
  const keyList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0"];

  const [number, setNumber] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  const MAX_NUMBER_LEN = 3;

  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    numberRef.current.focus();
    setNumber(user.number);
  }, []);

  const onChangeNumber = (e) => {
    const onlyNumber = e.target.value
      .replace(/[^0-9]/, "")
      .substring(0, MAX_NUMBER_LEN);

    // if (onlyNumber.length > MAX_NUMBER_LEN - 1) {
    //   setUser({ number: onlyNumber, gender: getGender(number) });
    //   navigate("/order");
    // }

    if (onlyNumber.length > MAX_NUMBER_LEN) return;

    setNumber(onlyNumber);
  };

  const onClickKayPad = (value) => {
    if (value === "C") {
      setNumber("");
      return;
    }

    const onlyNumber = (number + value).substring(0, MAX_NUMBER_LEN);

    // if (onlyNumber.length > MAX_NUMBER_LEN - 1) {
    //   setUser({ number: onlyNumber, gender: getGender(number) });
    //   navigate("/order");
    //   return;
    // }

    if (onlyNumber.length > MAX_NUMBER_LEN) return;

    setNumber(onlyNumber);
  };

  const onClickDelete = () => {
    setNumber(number.substring(0, number.length - 1));
  };

  const onClickReset = () => {
    resetUserState();
    navigate(-1);
  };

  return (
    <Container>
      <button className="back-btn" onClick={onClickReset}>
        뒤로가기
      </button>
      <h1>
        <span>락커키 정보</span>를
        <br />
        입력해주세요
      </h1>

      <ul className={`select-gender ${selectedGender.length > 0 && "hidden"}`}>
        <li
          className={selectedGender === "M" && "active"}
          onClick={() => setSelectedGender("M")}
        >
          남자
        </li>
        <li
          className={selectedGender === "F" && "active"}
          onClick={() => setSelectedGender("F")}
        >
          여자
        </li>
      </ul>
      <h2
        className={`show-select-gender ${selectedGender.length > 0 && "hidden"}`}
      >
        성별을 선택해주세요
      </h2>
      <div
        className={`show-input-locker ${selectedGender.length > 0 && "active"}`}
      >
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
            className={number.length > 0 && "active"}
            onClick={() => {
              if (number === "") return;

              setUser({ number, gender: getGender(selectedGender) });
              navigate("/order");
            }}
          >
            입력완료
          </button>
        </div>
      </div>
    </Container>
  );
};

export default LockerKeyPage;
