import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
    border-collapse: collapse;
    font-size: 1.2em;

    tr {
      display: flex;
      padding: 10px 0;
      border-bottom: 3px solid #f3f3f3;

      &:last-child {
        border: none;
      }

      td {
        display: flex;
        justify-content: center;
        align-items: center;

        &:nth-child(1) {
          min-width: 250px;
          justify-content: start;
        }
        &:nth-child(2) {
          min-width: 64px;
        }
        &:nth-child(3) {
          min-width: 200px;

          gap: 12px;
          button {
            padding: 6px 12px;
          }
        }
      }

      &.not-state {
        padding: 32px 0;
        td {
          font-size: 1.2em;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    thead {
      font-weight: 500;
      border-bottom: 3px solid #f3f3f3;
    }

    tbody {
    }
  }
`;
