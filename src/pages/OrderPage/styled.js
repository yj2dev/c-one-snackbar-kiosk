import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  background-color: #e7e8ec;
  height: 100%;
`;
export const ContentSection = styled.section`
  background-color: #fff;
  margin: 16px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  padding: 16px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  dl {
    //border: 1px solid red;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    img {
      //width: 156px;
      //height: 156px;
      width: 100%;
      object-fit: cover;
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
