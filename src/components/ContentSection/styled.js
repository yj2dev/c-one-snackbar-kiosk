import styled from "styled-components";

export const Container = styled.section`
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  border-radius: 8px;
  background-color: #fff;
  margin: 0 16px 16px 16px;
  padding: 16px 16px 0 16px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  //height: 484px; //컨텐츠 2줄일 때
  height: 550px; //컨텐츠 2줄, 아래 항목 보이게

  @media (max-width: 768px) {
    height: 370px;
  }

  overflow: scroll;
  transition: 0.1s;

  &.l-corner {
    border-radius: 0 8px 8px 8px;
  }

  &.r-corner {
    border-radius: 8px 0 8px 8px;
  }

  .center {
    grid-column: 1/5;
    grid-row: 1/4;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dl-wrapper {
    position: relative;

    span.sold-out-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-12deg);
      font-weight: 800;
      font-size: 4vw;
      color: #d44252;
      white-space: nowrap;
      padding: 0 8px;
      border: 4px solid #d44252;
    }
    button {
      outline: none;
      border: none;
      background-color: transparent;
      height: 234px;
      margin: 0;
      padding-bottom: 28px;
      text-align: center;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      position: relative;
      transition: 0.1s;

      &:not(.sold-out):active {
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
        transform: translate(2px, 2px);
      }

      @media (max-width: 768px) {
        height: 146px;
      }

      &.sold-out {
        opacity: 0.4;
        box-shadow: 0 0 0 #000;
      }
      img {
        border-radius: 4px 4px 0 0;
        height: 150px;
        width: 100%;
        object-fit: cover;
      }

      .name {
        @media (max-width: 768px) {
          font-size: 12px;
          margin: 4px 8px 0 8px;
        }
        margin: 4px 16px 0 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .price {
        @media (max-width: 768px) {
          font-size: 12px;
        }

        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: 1.2em;
        font-weight: 600;
        color: #111f90;
        padding: 0;
        margin: 0;
      }
    }
  }
`;

export const AlreadyItemAlert = styled.div`
  @media (max-width: 768px) {
    font-size: 0.8em;
  }

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: 0.2s;
  position: fixed;
  width: 100%;
  height: 54px;
  background-color: #111f90;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
  font-size: 1.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 10;
  top: -60px;
  left: 0;

  &.show {
    top: 0;
  }
`;
