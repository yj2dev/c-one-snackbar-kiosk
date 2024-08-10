import styled from "styled-components";

export const Container = styled.div`
  padding: 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 16px;
  user-select: none;

  h1 {
    position: absolute;
    top: 48px;
  }
  .move-landing {
    position: absolute;
    bottom: 48px;
    color: #000;
    text-decoration: none;
    font-size: 1.2em;

    &:hover {
      font-weight: 600;
    }
  }

  .content > a {
    margin: 0;
    text-decoration: none;
    color: #000;
    padding: 1em 2em;
    font-size: 2em;
    border: 1px solid #000;
    position: relative;
    transition: 0.2s;
    display: block;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      transition: 0.2s;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 16px;
      height: 100%;
      background-color: #000;
      z-index: -1;
    }

    &:hover {
      color: #fff;
      &::before {
        width: 100%;
      }
    }
  }
`;
