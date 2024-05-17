import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid blue;

  label {
    width: 240px;
    height: 240px;
    border: 2px dashed gray;
    border-radius: 8px;
    display: block;

    &.active {
      border: 2px dashed #000;
    }

    input[type="file"] {
      display: none;
    }
  }
`;
