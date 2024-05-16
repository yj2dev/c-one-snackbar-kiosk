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

  //button.order-start-btn {
  //  font-size: 4em;
  //  padding: 0.5em 1.8em;
  //  margin-bottom: 1em;
  //  border: none;
  //  border-radius: 12px;
  //  cursor: pointer;
  //  outline: none;
  //  background-color: #111f90;
  //  color: #fff;
  //  box-shadow: #322727 4px 4px 12px;
  //  transition: 0.2s;
  //
  //  &:hover {
  //    box-shadow: #322727 0 0 0;
  //  }
  //}

  h1 {
    text-align: center;
    font-size: 4em;
    margin: 1.4em 0 1.5em 0;
    padding: 0;
    color: #111f90;
  }

  img.c-one-logo {
    width: 100px;
    position: absolute;
    bottom: 28%;
  }

  p {
    img.island-icon {
      width: 64px;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    position: absolute;
    bottom: 15%;
    font-family: "Forum", sans-serif;
    font-size: 1.5em;
    font-weight: 800;
    padding: 0;
    margin: 0;
  }

  img.snackbar-img {
    z-index: -1;
    position: absolute;

    //width: 100%;
    //transform: rotate(5deg);
    opacity: 0.4;
  }

  span {
    position: absolute;
    bottom: 0;
    font-size: 1.5em;
    padding: 1em;
    width: 100%;
    text-align: center;
    color: #fff;
    background-color: rgba(66, 135, 245, 0.7);
  }
`;
