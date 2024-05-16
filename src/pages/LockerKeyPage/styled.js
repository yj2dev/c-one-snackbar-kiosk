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

  input[type="number"] {
    outline: none;
    font-size: 1.5em;
    text-align: center;
    letter-spacing: 12px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
