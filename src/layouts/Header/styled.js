import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(17, 31, 144, 1);
  padding: 8px;

  button.back-btn {
    border: none;
    outline: none;
    font-size: 1em;
    cursor: pointer;
    padding: 6px 10px;
    color: rgba(17, 31, 144, 1);
    background-color: transparent;
    font-weight: 600;
    transition: 0.1s;

    &:active {
      background-color: rgba(17, 31, 144, 1);
      color: #fff;
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
