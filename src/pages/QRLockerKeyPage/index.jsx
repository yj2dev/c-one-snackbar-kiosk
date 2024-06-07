import { Container } from "./styled.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import KeyPad from "../../components/Keypad/index.jsx";
import SelectGender from "../../components/SelectGender/index.jsx";
import { notFoundPopupState } from "../../recoil/atoms/notFoundPopupState.js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modeState } from "../../recoil/atoms/modeState.js";

const LockerKeyPage = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");

  const [mode, setMode] = useRecoilState(modeState);
  const setNotFoundShow = useSetRecoilState(notFoundPopupState);
  const { token } = useParams();

  useEffect(() => {
    if (mode.token.includes(token)) {
      setNotFoundShow(false);
    } else {
      setNotFoundShow(true);
    }
  }, [token, mode.token]);

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
