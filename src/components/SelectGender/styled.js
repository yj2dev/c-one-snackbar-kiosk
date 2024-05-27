import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    text-align: center;
    font-size: 4em;
    padding: 0;
    margin: 0;
    color: #111f90;

    &.hidden {
      display: none;
    }

    span {
      color: #ff4400;
      //font-size: 1.4em;
      padding: 0;
      margin: 0;
    }
  }

  h2.show-select-gender {
    font-size: 2em;
    color: #111f90;
    padding: 4px;

    &.hidden {
      display: none;
    }
  }

  ul.select-gender {
    list-style: none;
    //border: 1px solid #111f90;
    font-size: 2em;
    width: 350px;
    border-radius: 12px;
    display: flex;
    justify-content: space-evenly;
    padding: 0;
    margin: 1.2em 0 0.5em 0;
    border: 4px dashed #111f90;

    &.hidden {
      margin: 0.5em 0;
      border: none;
    }

    li {
      cursor: pointer;
      width: 100%;
      padding: 8px 0;
      border-radius: 12px;
      text-align: center;
      transition: 0.025s;

      font-weight: 800;

      &:first-child {
        color: #3266ff;
        &.active {
          background-color: #3266ff;
          color: #fff;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        }
      }
      &:last-child {
        color: #ff4785;
        &.active {
          background-color: #ff4785;
          color: #fff;
          box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
`;
