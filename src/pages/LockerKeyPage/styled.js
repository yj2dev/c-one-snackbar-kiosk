import styled from "styled-components";

export const Container = styled.div`
  border: 8px solid #111f90;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  position: relative;

  button.back-btn {
    border: none;
    outline: none;
    font-size: 1em;
    cursor: pointer;
    position: absolute;
    margin: 8px;
    padding: 6px 10px;
    top: 0;
    left: 0;
    color: rgba(17, 31, 144, 1);
    background-color: transparent;
    font-weight: 600;
    transition: 0.1s;

    &:active {
      background-color: rgba(17, 31, 144, 1);
      color: #fff;
    }
  }

  h1 {
    text-align: center;
    font-size: 4em;
    padding: 0;
    margin: 0;
    color: #111f90;

    span {
      color: #ff4400;
      font-size: 1.4em;
      padding: 0;
      margin: 0;
    }
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
    margin: 1em 0 1em 0;
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

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #111f90;
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
