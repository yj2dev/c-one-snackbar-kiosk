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

  dl {
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

    img {
      border-radius: 4px 4px 0 0;
      height: 150px;
      width: 100%;
      object-fit: cover;
    }

    dt {
      margin: 4px 16px 0 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    dd {
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
`;

export const AlreadyItemAlert = styled.div`
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
