import { Container } from "./styled.js";
import { useState } from "react";

const LockerKeyPage = () => {
  const [gender, setGender] = useState("M");
  const [number, setNumber] = useState("");

  const onChangeNumber = (e) => {
    if (e.target.value.length > 4) return;

    setNumber(e.target.value);
  };

  return (
    <Container>
      <h1>
        결제 락커키 정보를
        <br />
        입력해주세요
      </h1>

      <input type="number" value={number} onChange={onChangeNumber} />
    </Container>
  );
};

export default LockerKeyPage;
