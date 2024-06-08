import { Container } from "./styled.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import KeyPad from "../../components/Keypad/index.jsx";
import SelectGender from "../../components/SelectGender/index.jsx";
import { notFoundPopupState } from "../../recoil/atoms/notFoundPopupState.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modeState } from "../../recoil/atoms/modeState.js";

const LockerKeyPage = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");

  const mode = useRecoilValue(modeState);
  const setNotFoundShow = useSetRecoilState(notFoundPopupState);

  const getSessionToken = () => {
    const sessionToken = sessionStorage.getItem("qr_token");
    if (sessionToken) return sessionToken;
  };

  useEffect(() => {
    const token = getSessionToken();

    if (mode.token.includes(token)) {
      setNotFoundShow(false);
    } else {
      setNotFoundShow(true);
    }
  }, [mode.token]);

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
