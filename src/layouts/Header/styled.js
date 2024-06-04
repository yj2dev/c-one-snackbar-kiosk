import styled from "styled-components";

export const Container = styled.header`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 0 0 20px 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    font-size: 14px;
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    word-break: keep-all;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 10px;
    font-weight: 600;
    color: rgba(17, 31, 144, 1);

    img {
      margin-right: 4px;
      width: 18px;
      height: 18px;
    }
  }
  .user-info {
    span.gender-badge {
      color: #fff;
      padding: 0 4px;
      margin-right: 6px;
      border: none;
      outline: none;
      border-radius: 4px;

      &.M {
        background-color: #3266ff;
      }

      &.F {
        background-color: #ff4785;
      }
    }

    font-size: 1em;
    font-weight: 600;
    padding: 6px 10px;
    color: rgba(17, 31, 144, 1);
  }
`;
