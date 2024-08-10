import styled from "styled-components";

export const Container = styled.div`
  padding: 48px;

  > table {
    width: 100%;

    thead tr:first-child {
      border-top: none;
    }

    tr {
      display: flex;

      border-top: 1px solid rgba(0, 0, 0, 0.2);

      td {
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        > input[type="number"] {
          width: 32px;
        }

        border-right: 1px solid rgba(0, 0, 0, 0.2);
        &:last-child {
          border-right: none;
        }

        &:first-child {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-basis: 100px;
          flex-shrink: 0;
        }
      }
    }
  }
`;
