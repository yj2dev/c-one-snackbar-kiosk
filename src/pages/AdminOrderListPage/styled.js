import styled from "styled-components";

export const Container = styled.div`
  padding: 48px;

  .back-btn {
    cursor: pointer;
  }

  section.order-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .order-item {
      //box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
      border-bottom: 3px solid #f3f3f3;

      display: flex;
      flex-direction: row;
      gap: 24px;
      padding: 16px;

      article.order-info {
        font-size: 1.3em;
        font-weight: 600;
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin: 0;
        gap: 0;
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
        .order-product {
          color: #868686;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          white-space: pre-wrap;
          span {
          }
        }
      }

      article.btn {
        margin-left: 24px;
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
          border: 6px solid #000;
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
            transition: 0.2s;
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
