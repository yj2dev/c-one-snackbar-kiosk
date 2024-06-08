import styled from "styled-components";

export const Container = styled.div`
  padding: 48px;

  .search-orderlist {
    width: 100%;
    position: relative;
    input {
      width: 100%;
      border: 3px solid #f3f3f3;
      box-sizing: border-box;
      padding: 8px 40px 8px 12px;
      outline: none;
      font-size: 1em;
      transition: 0.1s;

      &:focus {
        border: 3px solid #d4d4d4;
      }
    }
    button.delete-btn {
      cursor: pointer;
      background-color: transparent;
      border: none;
      outline: none;
      position: absolute;
      width: 32px;
      height: 32px;
      padding: 0 14px 0 0;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);

      &::before {
        @media (max-width: 768px) {
          width: 16px;
          height: 3px;
        }

        content: "";
        width: 16px;
        height: 3px;
        background-color: #d4d4d4;
        border-radius: 6px;
        transform: rotate(135deg);
        position: absolute;
      }

      &::after {
        @media (max-width: 768px) {
          width: 16px;
          height: 3px;
        }
        content: "";
        width: 16px;
        height: 3px;
        background-color: #d4d4d4;
        border-radius: 6px;
        transform: rotate(45deg);
        position: absolute;
      }
    }
  }

  .back-btn {
    cursor: pointer;
  }

  h1 {
    .date-picker {
      margin-left: 16px;
      border: none;
      outline: none;
      width: 120px;
      font-size: 0.5em;
      text-align: center;
    }
  }

  section.order-list {
    .empty-message {
      padding: 48px 0;
      display: flex;
      justify-content: center;
    }

    display: flex;
    flex-direction: column;
    gap: 16px;

    ul.tab {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      //background-color: #dddddd;

      li {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 0;
        width: 100%;
        border-top: 3px solid #f3f3f3;
        border-right: 3px solid #f3f3f3;
        border-bottom: 3px solid #f3f3f3;

        &:last-child {
          border-right: none;
        }

        &.active {
          font-weight: 600;
          border-bottom: none;
          background-color: #fff;
        }
      }
    }

    .order-item {
      position: relative;
      border-bottom: 3px solid #f3f3f3;
      //box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 16px 16px 16px;
      gap: 12px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      article.order-info {
        font-size: 1.3em;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin: 0;
        gap: 0;

        @media (max-width: 768px) {
          align-items: start;
        }

        .order-detail-now {
          font-size: 12px;
        }

        .order-now {
          margin-bottom: 12px;
        }

        .order-user {
          font-size: 1rem;

          span.gender-badge {
            color: #fff;
            padding: 0 4px;
            margin-right: 6px;
            border: none;
            outline: none;
            border-radius: 4px;

            &.M {
              background-color: #3266ff;
            }

            &.F {
              background-color: #ff4785;
            }
          }
        }

        span.order-uid {
          font-size: 1rem;
          color: #868686;
        }
      }

      article.order-detail {
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .order-title {
          font-weight: 600;
        }

        .order-product-container {
          color: #868686;
          display: flex;
          flex-direction: column;

          .order-product {
            span {
              margin: 4px;
              position: relative;
              display: inline-flex;
              cursor: pointer;

              &::before {
                content: "";
                width: 0;
                height: 3px;
                top: 50%;
                background-color: rgba(255, 0, 0, 0.5);
                position: absolute;
                transform: rotate(-4deg);
                transition: 0.1s width;
              }

              //&:hover {
              //  &::before {
              //    width: 100%;
              //  }
              //}

              @media (max-width: 768px) {
                &:hover::before {
                  width: 0;
                }
              }

              &.ready {
                &::before {
                  background-color: rgba(255, 0, 0, 1);
                  width: 100%;
                }
              }
            }
          }
        }
      }

      .delete-btn-container {
        display: flex;
        justify-content: center;
        align-items: center;

        .delete-btn {
          transition: 0.1s;
          font-size: 28px;
          font-weight: 800;
          color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 50px;
          background-color: transparent;
          border: none;
          outline: none;

          &:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      }

      article.btn {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          cursor: pointer;
          width: 84px;
          height: 84px;
          color: #000;
          font-weight: 800;
          font-size: 1.2em;
          box-sizing: border-box;
          border: 5px solid #000;
          border-radius: 4px;
          position: relative;
          background-color: transparent;
          transition: 0.2s;
          letter-spacing: 2px;
          line-height: 1.1;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 0;
            background-color: #1a7cff;
            z-index: -1;
            transition: 0.15s;
          }

          &:hover {
            color: #fff;

            &::before {
              height: 100%;
            }
          }
        }
      }
    }
  }
`;
