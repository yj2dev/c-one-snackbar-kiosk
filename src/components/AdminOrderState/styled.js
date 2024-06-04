import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
    border-collapse: collapse;
    font-size: 1.2em;
    @media (max-width: 768px) {
      width: 100%;
    }

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
          @media (max-width: 768px) {
            min-width: auto;
            flex: 1;
          }
          white-space: nowrap;
          min-width: 250px;
          justify-content: start;
        }
        &:nth-child(2) {
          @media (max-width: 768px) {
            min-width: auto;
            flex: 1;
          }
          min-width: 64px;
        }
        &:nth-child(3) {
          @media (max-width: 768px) {
            flex: 1;
            min-width: auto;
            flex-direction: column;
          }

          min-width: 200px;
          gap: 12px;
          button {
            white-space: nowrap;
            padding: 6px 12px;
            color: #000;
            background-color: transparent;
            border: 2px solid #000;
            border-radius: 4px;
            cursor: pointer;
            transition: 0.1s;

            @media (max-width: 768px) {
              flex: 1;
              min-width: auto;
              flex-direction: column;
              &:hover {
                background-color: transparent;
                color: #000;
              }
            }

            &:hover {
              background-color: #000;
              color: #fff;
            }

            &:active {
              background-color: #000;
              color: #fff;
            }
          }
        }
      }

      &.not-state {
        padding: 32px 0;
        td {
          font-size: 1rem;
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
