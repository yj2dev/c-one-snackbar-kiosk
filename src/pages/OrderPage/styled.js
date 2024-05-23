import styled from "styled-components";

export const Container = styled.div`
  user-select: none;
  background-color: #e7e8ec;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

  &.show {
    top: 0;
  }
`;
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
export const SucceedOrderPopup = styled.div`
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
  transition: 0.2s;
  transform: translate(-50%, -50%);
  //bottom: -150%;
  top: -400px;
  &.show {
    top: calc(50%);
  }

  p {
    padding: 0;
    text-align: center;
    margin: 0 0 48px 0;
    letter-spacing: 2px;

    &.landing-timer {
      position: absolute;
      font-weight: 200;
      bottom: 0;
      font-size: 0.6em;
      text-align: center;
    }
  }
`;
export const BasketSection = styled.section`
  background-color: #fff;
  flex: 1;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 16px;
  padding: 16px;
  position: relative;
  overflow: scroll;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  article.content {
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 1.5em;
      color: #111f90;
      padding: 0;
      margin: 0 0 12px 0;
      text-align: center;
    }
    table.basket-list {
      border-collapse: collapse;
      width: 100%;
      tr {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        border-bottom: 2px solid #e7e8ec;

        &:last-child {
          border: none;
        }

        td {
          font-size: 1.2em;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6px 4px;

          button {
            &.delete-btn {
              position: relative;
              &::before {
                content: "";
                width: 16px;
                height: 3px;
                background-color: #fff;
                border-radius: 6px;
                transform: rotate(135deg);

                position: absolute;
              }
              &::after {
                content: "";
                width: 16px;
                height: 3px;
                background-color: #fff;
                border-radius: 6px;
                transform: rotate(45deg);
                position: absolute;
              }
            }
            &.increase-btn {
              position: relative;
              &::before {
                content: "";
                width: 16px;
                height: 3px;
                background-color: #fff;
                border-radius: 6px;
                position: absolute;
              }
              &::after {
                content: "";
                width: 16px;
                height: 3px;
                background-color: #fff;
                border-radius: 6px;
                transform: rotate(90deg);
                position: absolute;
              }
            }
            &.decrease-btn {
              position: relative;
              &::before {
                content: "";
                width: 16px;
                height: 3px;
                background-color: #fff;
                border-radius: 6px;
                position: absolute;
              }
            }

            cursor: pointer;
            border-radius: 12px;
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1em;
            border: none;
            outline: none;
            background-color: rgba(0, 0, 0, 0.2);
            color: #fff;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            transition: 0.1s;
            &:active {
              box-shadow: 0 0 0 0;
              transform: translate(1px, 1px);
            }
          }

          &:nth-child(1) {
            width: 28px;
            color: #111f90;
            font-weight: 600;
          }
          &:nth-child(2) {
            justify-content: start;
            width: 150px;
          }
          &:nth-child(3) {
            width: 120px;
            p {
              text-align: center;
              width: 44px;
              padding: 0;
              margin: 0;
            }
          }
          &:nth-child(4) {
            justify-content: end;
            flex: 1;
          }
          &:nth-child(5) {
            button {
              background-color: #f05855;
            }
          }
        }
      }
    }

    .center {
      margin: auto auto;
      color: #111f90;
      font-size: 1.5em;
      font-weight: 600;
    }
  }

  article.order-info {
    position: fixed;

    top: 604px; // 컨텐츠 2줄 일때
    //top: 834px; // 컨텐츠 3줄 일때

    bottom: 0;
    right: 0;
    margin: 16px;
    width: 24%;

    display: flex;
    flex-direction: column;
    gap: 16px;

    .info {
      transition: 0.1s;
      height: 100%;

      p {
        text-align: end;
        font-size: 1.5em;
        font-weight: 600;
        padding: 0 0 0 40px;
        margin: 0;
        position: relative;
        span {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.8em;
          color: #111f90;
        }
      }
    }
    button {
      border: none;
      outline: none;
      background-color: #111f90;
      color: #fff;
      font-weight: 800;
      font-size: 1.9em;
      border-radius: 4px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

      transition: 0.2s;
      cursor: pointer;

      &.cancel {
        background-color: rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        padding: 0;
        height: 50%;
      }

      &.submit {
        height: 100%;
        &:disabled {
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          background-color: rgba(17, 31, 144, 0.5);
          cursor: default;
        }
      }

      &:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      }
    }
  }
`;
export const ContentSection = styled.section`
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  border-radius: 8px;
  background-color: #fff;
  margin: 0 16px 16px 16px;
  padding: 16px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 16px;
  //height: 666px;
  height: 436px; //컨텐츠 2줄일 때
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
