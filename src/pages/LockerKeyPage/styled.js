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

  h2.show-select-gender {
    font-size: 2em;
    color: #111f90;
    padding: 4px;

    &.hidden {
      display: none;
    }
  }

  ul.select-gender {
    list-style: none;
    //border: 1px solid #111f90;
    font-size: 2em;
    width: 350px;
    border-radius: 12px;
    display: flex;
    justify-content: space-evenly;
    padding: 0;
    margin: 1.2em 0 0.5em 0;
    border: 4px dashed #111f90;

    &.hidden {
      margin: 0.5em 0;
      border: none;
    }

    li {
      width: 100%;
      padding: 8px 0;
      border-radius: 12px;
      text-align: center;
      transition: 0.2s;
      font-weight: 800;

      &:first-child {
        color: #3266ff;
        &.active {
          background-color: #3266ff;
          color: #fff;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        }
      }
      &:last-child {
        color: #ff4785;
        &.active {
          background-color: #ff4785;
          color: #fff;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  .show-input-locker {
    transition: 0.2s;
    overflow: hidden;
    height: 0;
    &.active {
      height: 524px;
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
