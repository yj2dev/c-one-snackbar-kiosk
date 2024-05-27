import styled from "styled-components";

export const Container = styled.section`
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    list-style: none;
    padding: 0;
    grid-gap: 8px;
    margin: 16px;
    //border-bottom: 1px solid #111f90;

    li {
      padding: 4px 0;
      font-size: 1.2em;
      cursor: pointer;
      border-top: none;
      border-bottom: none;
      min-width: 64px;
      text-align: center;
      transition: 0.1s ease-in;
      border-radius: 20px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
      background-color: #111f90;
      color: #fff;
      z-index: 10;
      position: relative;

      &.active {
        z-index: 20;
        background-color: #fff;
        color: #111f90;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
        transform: translate(0, 16px);
        border-radius: 20px 20px 0 0;
      }
    }
  }
`;
