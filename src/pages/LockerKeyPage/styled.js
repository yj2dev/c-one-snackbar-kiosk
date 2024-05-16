import styled from "styled-components";

export const Container = styled.div`
  border: 8px solid #111f90;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    font-size: 4em;
    margin: 1.4em 0 0.5em 0;
    padding: 0;
    color: #111f90;
  }

  ul.select-gender {
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
    width: 500px;
    position: relative;
    border-radius: 16px;

    border: 1px solid red;
    padding: 4px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      border: 1px solid blue;
      left: 0;
      width: 50%;
      height: 100%;
      transition: 0.2s;
    }

    &.active {
      &::before {
        left: 50px;
      }
    }

    li {
      font-size: 1.5em;
      width: 100%;
      text-align: center;
      padding: 24px 0;
      margin: 0;
      transition: 0.2s;

      //&:nth-child(1) {
      //  &::before {
      //    content: "";
      //    position: absolute;
      //    top: 0;
      //    border: 1px solid blue;
      //    left: 0;
      //    width: 50%;
      //    height: 100%;
      //  }
      //
      //  border: 2px solid red;
      //  border-radius: 16px 0 0 16px;
      //  right: 0;
      //}

      //&.active {
      //  border: 2px solid green;
      //}
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
