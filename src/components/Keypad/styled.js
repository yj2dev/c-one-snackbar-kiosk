import styled from "styled-components";

export const Container = styled.div`
  transition: 0.2s;
  overflow: hidden;
  height: 0;
  &.active {
    height: 564px;
  }

  input[type="text"] {
    outline: none;
    font-size: 2em;
    font-weight: 800;
    text-align: center;
    letter-spacing: 12px;
    padding: 8px 0;
    width: 350px;
    border: 4px solid #111f90;
    box-sizing: border-box;
    border-radius: 12px;
    color: #111f90;
    margin: 0 0 0.5em 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .keypad {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 350px;
    gap: 12px;

    button:last-child {
      grid-column: 1/4;

      &.active {
        background-color: rgba(17, 31, 144, 1);
      }
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(17, 31, 144, 0.8);

      font-size: 2em;
      border-radius: 12px;
      color: #fff;
      padding: 16px 0;
      cursor: pointer;
      transition: 0.1s;
      box-shadow: 2px 2px 8px #7d7d7d;
      outline: none;
      border: none;

      &:active {
        box-shadow: 0 0 0 #7d7d7d;
        transform: translate(2px, 2px);
      }
    }
  }
`;
