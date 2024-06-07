import styled from "styled-components";

export const Screen = styled.div`
  &.show {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    z-index: 500;
  }
`;
export const Popup = styled.div`
  @media (max-width: 768px) {
    width: 260px;
    height: 300px;
    font-size: 1.2em;
    padding: 12px 32px;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #111f90;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  font-size: 2.8em;
  color: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 24px 64px;
  z-index: 1000;
  border-radius: 8px;
  width: 600px;
  height: 600px;
  position: fixed;
  left: 50%;
  //transition: 0.2s;
  transform: translate(-50%, -50%);
  top: -400px;
  gap: 24px;
  &.show {
    top: calc(50%);
  }

  p {
    padding: 0;
    text-align: center;
    margin: 0 0 0 0;
    letter-spacing: 2px;
  }
`;
