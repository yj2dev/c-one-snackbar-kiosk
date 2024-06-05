import { Popup, Screen } from "./styled.js";
import { useNavigate } from "react-router-dom";

const SucceedOrderPopup = ({ succeedOrder, landingTimer }) => {
  const navigate = useNavigate();

  return (
    <>
      <Popup
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
      </Popup>
      <Screen className={succeedOrder ? "show" : ""} />
    </>
  );
};

export default SucceedOrderPopup;
