import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  background-color: #e7e8ec;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const BasketSection = styled.section`
  background-color: #fff;
  flex: 1;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 16px;
  padding: 16px;

  .content {
    .center {
      border: 1px solid red;
    }
  }
  button {
    border: none;
    outline: none;
    background-color: #111f90;
    color: #fff;
    font-weight: 800;
    font-size: 2em;
    border-radius: 4px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
    transition: 0.025s;
    cursor: pointer;

    &:active {
      transform: translate(2px, 2px);
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
    }
  }
`;
export const ContentSection = styled.section`
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: #fff;
  margin: 0 16px 16px 16px;
  padding: 16px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 16px;
  height: 436px;
  overflow: scroll;

  .center {
    grid-column: 1/5;
    grid-row: 1/3;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  dl {
    height: 210px;
    margin: 0;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding-bottom: 4px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    img {
      border-radius: 4px 4px 0 0;
      height: 150px;
      width: 100%;
      object-fit: cover;
    }

    dt {
      margin-top: 4px;
      text-align: center;
    }

    dd {
      text-align: center;
      font-size: 1.2em;
      font-weight: 600;
      color: #111f90;
      padding: 0;
      margin: 0;
    }
  }
`;

export const TabSection = styled.section`
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
      color: #111f90;
      border-top: none;
      border-bottom: none;
      min-width: 64px;
      text-align: center;
      transition: 0.2s;
      background-color: #fff;
      border-radius: 20px;

      &.active {
        //border-radius: 20px 20px 0 0;
        border-radius: 20px;
        background-color: #111f90;
        color: #fff;
      }
    }
  }
`;
