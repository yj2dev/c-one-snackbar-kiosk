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

    input[type="text"] {
      width: 70px;
    }

    .category-item {
      border: 2px solid #000;
      //padding: 4px 8px;
      padding: 12px;
      display: flex;
      gap: 4px;
    }
  }

  table.product-list {
    border-collapse: collapse;

    tr {
      //border: 1px solid orangered;
      display: flex;

      td {
        padding: 12px 0;
        width: 100%;
        border: 1px solid darkorchid;
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
