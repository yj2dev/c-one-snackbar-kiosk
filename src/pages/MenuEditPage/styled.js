import styled from "styled-components";

export const Container = styled.div`
  button {
    cursor: pointer;
  }

  img {
    border-radius: 4px;
    height: 180px;
    width: 180px;
    object-fit: cover;
  }

  .category-list {
    border: 1px solid #000;
    display: flex;

    .category {
      border: 1px solid #000;
      display: flex;
      gap: 4px;
    }
  }

  h2 {
    p {
      font-size: 1rem;
      font-weight: 400;
      display: inline-block;
      span {
        color: red;
      }
    }
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
