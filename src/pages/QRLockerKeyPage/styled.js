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
`;
