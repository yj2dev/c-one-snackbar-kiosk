import styled from "styled-components";
import snackbar from "/public/assets/images/snackbar.jpg";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  border: 8px solid #111f90;
  box-sizing: border-box;
  overflow: hidden;
  user-select: none;
  justify-content: center;

  h1 {
    text-align: center;
    font-size: 5.4em;
    padding: 0;
    color: #111f90;
    //margin: 1.4em 0 1.5em 0;
  }

  img.c-one-logo {
    width: 100px;
    //position: absolute;
    //bottom: 28%;
    margin: 0 0 4em 0;
  }

  p {
    img.island-icon {
      width: 64px;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    //position: absolute;
    bottom: 15%;
    font-family: "Forum", sans-serif;
    font-size: 1.5em;
    font-weight: 800;
    padding: 0;

    margin: 0 0 6em 0;
  }

  img.snackbar-img {
    z-index: -1;
    position: absolute;

    opacity: 0.5;
  }

  span {
    position: absolute;
    bottom: 0;
    font-size: 1.8em;
    padding: 0.8em;
    width: 100%;
    text-align: center;
    color: #fff;
    background-color: rgba(66, 135, 245, 0.7);
  }
`;
