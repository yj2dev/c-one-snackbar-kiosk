import { Popup, Screen } from "./styled.js";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modeState } from "../../recoil/atoms/modeState.js";
import { notFoundPopupState } from "../../recoil/atoms/notFoundPopupState.js";

const SucceedOrderPopup = ({ succeedOrder, landingTimer }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useRecoilState(modeState);
  const setNotFoundShow = useSetRecoilState(notFoundPopupState);

  return (
    <>
      <Popup
        className={succeedOrder ? "show" : ""}
        onClick={() => {
          if (mode.isQr) {
            setNotFoundShow(true);
            const newToken = uuidv4().replaceAll("-", "").substring(0, 24);
            navigate(`/${newToken}/qro`);
          } else {
            navigate("/");
          }
        }}
      >
        <p>주문이 완료되었습니다</p>
        <p>음식이 준비되면 락커키 번호로 불러드리겠습니다</p>
        <p className="landing-timer">
          화면을 터치하거나 {landingTimer}초 후에 <br />
          처음화면으로 이동합니다
        </p>
      </Popup>
      <Screen className={succeedOrder ? "show" : ""} />
    </>
  );
};

export default SucceedOrderPopup;
