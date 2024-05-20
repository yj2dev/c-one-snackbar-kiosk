import styled from "styled-components";

export const Container = styled.div`
  padding: 48px;

  .back-btn {
    cursor: pointer;
  }

  h1 {
    margin: 16px 0;
  }

  h2 {
    margin: 0 0 12px 0;

    p {
      font-size: 1rem;
      font-weight: 400;
      display: inline-block;

      span {
        font-weight: 800;
        padding: 0;
        margin: 0 0 0 12px;
        color: red;
      }
    }
  }

  .category-list {
    display: flex;
    gap: 4px;
    align-items: center;

    input[type="text"] {
      width: 70px;
    }

    .category-item {
      border: 2px solid #000;
      padding: 6px 8px;
      display: flex;
      gap: 4px;
      cursor: pointer;

      &.active {
        font-weight: 800;
      }
    }
  }

  table.product-list {
    border-collapse: collapse;
    margin: 12px 0;
    width: 100%;

    tr {
      display: flex;
      border-bottom: 1px solid #000;
      padding: 4px 0;

      &:last-child {
        border-bottom: none;
      }
      td {
        display: flex;
        align-items: center;
        &:nth-child(1) {
          width: 70px;
          img {
            width: 50px;
            height: 50px;
          }
        }

        &:nth-child(2) {
          width: 120px;
        }
        &:nth-child(3) {
          justify-content: end;
          width: 100px;
        }
        &:nth-child(4) {
          justify-content: end;
          width: 100px;
        }
        &:nth-child(5) {
          justify-content: end;
          width: 80px;
        }
      }
    }
  }

  button {
    cursor: pointer;
  }

  img {
    border-radius: 4px;
    height: 180px;
    width: 180px;
    object-fit: cover;
  }

  label {
    cursor: pointer;
    width: 180px;
    height: 180px;
    border: 3px dashed rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;

    .desc {
      text-align: center;
    }

    &.active {
      border: 3px dashed rgba(0, 0, 0, 1);
    }

    input[type="file"] {
      display: none;
    }
  }
`;
