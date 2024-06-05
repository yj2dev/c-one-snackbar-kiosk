import { Container } from "./styled.js";
import COneLogoIcon from "/public/assets/images/c-one-logo-icon.png";
import { useRecoilValue } from "recoil";
import { timerState } from "../../recoil/atoms/timerState.js";
import { modeState } from "../../recoil/atoms/modeState.js";

const Header = () => {
  const sec = useRecoilValue(timerState);
  const mode = useRecoilValue(modeState);

  return (
    <Container>
      <div className="left m-none"></div>
      <div className="title">
        <img className="c-one-logo" src={COneLogoIcon} alt="씨원리조트 로고" />
        씨원리조트 스낵바
      </div>
      <div className="right">
        {mode.isQr ? (
          <>{sec}초&nbsp; 후 주문만료</>
        ) : (
          <>
            {sec}초&nbsp;후에 처음화면
            <span className="m-none">으로 이동합니다</span>
          </>
        )}
      </div>
    </Container>
  );
};

export default Header;
