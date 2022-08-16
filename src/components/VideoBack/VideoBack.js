import styled from "styled-components";
import ReactDOM from "react-dom";
import { useRef, useEffect, useState } from "react";

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

const ModalBx = styled.div`
  top: 30vh;
  left: calc(50% - 250px);
  z-index: 101;
  animation: slide-down 500ms ease-out forwards;
  position: fixed;

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const ModalClose = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation: slide-up 500ms ease-out forwards;
  @keyframes slide-up {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10rem);
    }
  }
`;

const Backdrop = (props) => {
  return <Back>{props.children}</Back>;
};

const VideoBack = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop>{props.children}</Backdrop>,
        document.getElementById("mouse")
      )}
    </>
  );
};
export default VideoBack;
