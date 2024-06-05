import { Popup, Screen } from "./styled.js";

const NotFoundPopup = ({ show }) => {
  if (!show) return;

  return (
    <>
      <Popup className={show ? "show" : ""}>
        <p>QR코드가 만료되었습니다</p>
        <p>다시 스캔후 주문해주세요</p>
      </Popup>
      <Screen className={show ? "show" : ""} />
    </>
  );
};

export default NotFoundPopup;
