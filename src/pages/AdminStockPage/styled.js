import styled from "styled-components";

export const Container = styled.div`
  padding: 48px;

  .back-btn {
    cursor: pointer;
  }
  > select {
    font-size: 20px;
    padding: 4px 12px;
    border-radius: 4px;
    margin-bottom: 24px;

    option {
    }
  }

  > table {
    width: 100%;
    text-decoration: line-through;

    thead tr:first-child {
      border-top: none;
    }

    tr {
      display: flex;
      border-top: 1px solid rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      td {
        padding: 6px 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;

        > button {
          cursor: pointer;
          padding: 4px 12px;
          margin: 0 8px;
          border-radius: 4px;
          outline: none;
          border: none;
        }

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
