import styled from "styled-components";

export const Container = styled.div`
  padding: 48px;

  .back-btn {
    cursor: pointer;
  }

  section.order-list {
    .order-item {
      display: flex;
      flex-direction: row;
      gap: 24px;
      padding: 16px;
      //border: 1px solid #000;
      border-bottom: 3px solid #f3f3f3;
      border: 1px solid red;

      article.order-info {
        //border: 1px solid red;
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
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .order-title {
          font-weight: 600;
        }
        .order-product {
          color: #868686;
        }
      }
    }
  }
`;
