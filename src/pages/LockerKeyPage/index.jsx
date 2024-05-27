import { Container } from "./styled.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import KeyPad from "../../components/Keypad/index.jsx";
import SelectGender from "../../components/SelectGender/index.jsx";

const LockerKeyPage = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <button className="back-btn" onClick={onClickBack}>
        뒤로가기
      </button>
      <SelectGender gender={gender} setGender={setGender} />
      <KeyPad gender={gender} />
    </Container>
  );
};

export default LockerKeyPage;
