import { Container } from "./styled.js";
import { useState } from "react";

const LockerKeyPage = () => {
  const [gender, setGender] = useState("M");
  const [number, setNumber] = useState("");

  const onChangeNumber = (e) => {
    if (e.target.value.length > 4) return;

    setNumber(e.target.value);
  };

  const onClickMale = () => {
    setGender("M");
    setNumber(0);
  };
  const onClickFemale = () => {
    setGender("F");
  };

  return (
    <Container>
      <h1>
        결제 락커키 정보를
        <br />
        입력해주세요
      </h1>

      <ul className={`select-gender ${gender === "M" && "active"}`}>
        <li className={gender === "M" && "active"} onClick={onClickMale}>
          남자
        </li>
        <li className={gender === "F" && "active"} onClick={onClickFemale}>
          여자
        </li>
      </ul>

      <input type="number" value={number} onChange={onChangeNumber} />
    </Container>
  );
};

export default LockerKeyPage;
