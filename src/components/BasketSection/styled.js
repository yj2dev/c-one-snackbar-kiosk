import styled from "styled-components";

export const Container = styled.section`
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
            width: 280px;
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

    //top: 652px;
    top: 702px;

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
