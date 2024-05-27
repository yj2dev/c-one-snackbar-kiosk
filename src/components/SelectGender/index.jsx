import { Container } from "./styled.js";

const SelectGender = ({ gender, setGender }) => {
  return (
    <Container>
      <h1 className={gender !== "" ? "hidden" : ""}>
        결제&nbsp;
        <span>락커키 정보</span>를
        <br />
        입력해주세요
      </h1>

      <ul className={`select-gender ${gender !== "" ? "hidden" : ""}`}>
        <li
          className={gender === "M" ? "active" : ""}
          onClick={() => setGender("M")}
        >
          남자
        </li>
        <li
          className={gender === "F" ? "active" : ""}
          onClick={() => setGender("F")}
        >
          여자
        </li>
      </ul>
      <h2 className={`show-select-gender ${gender !== "" ? "hidden" : ""}`}>
        성별을 선택해주세요
      </h2>
    </Container>
  );
};

export default SelectGender;
