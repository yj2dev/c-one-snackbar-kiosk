import { Container } from "./styled.js";
import { useEffect, useRef, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

const LockerKeyPage = () => {
  const numberRef = useRef(null);

  const keyList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0"];

  const [number, setNumber] = useState("");

  useEffect(() => {
    // document.addEventListener("touchstart", function () {}, true);

    numberRef.current.focus();
  }, []);

  const onChangeNumber = (e) => {
    e.preventDefault();
    if (e.target.value.length > 4) return;

    setNumber(e.target.value);
  };

  const onClickKayPad = (value) => {
    if (number.length >= 4) return;

    console.log("value >> ", value);

    if (value === "c") {
      setNumber("");
      // return;
    } else {
      setNumber((prev) => prev + value);
    }
  };

  const onClickDelete = () => {
    setNumber(number.substring(0, number.length - 1));
  };

  return (
    <Container>
      <h1>
        <span>락커키 번호</span>를
        <br />
        입력해주세요
      </h1>
      <input
        type="number"
        ref={numberRef}
        value={number}
        onChange={onChangeNumber}
        inputMode="none"
      />

      <div className="keypad">
        {keyList.map((item, index) => (
          <span
            key={index}
            onClick={() => {
              onClickKayPad(item);
            }}
          >
            {item}
          </span>
        ))}

        <span onClick={onClickDelete}>
          <FaDeleteLeft />
        </span>
      </div>
    </Container>
  );
};

export default LockerKeyPage;
