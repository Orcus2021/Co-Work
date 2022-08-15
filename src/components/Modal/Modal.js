import styled from "styled-components";
import ReactDOM from "react-dom";

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
`;
const ModalBx = styled.div`
  top: 30vh;
  left: calc(50% - 250px);
  z-index: 101;
  animation: ${(props) => (props.$isClose ? "slide-up" : "slide-down")} 500ms
    ease-out forwards;
  position: fixed;

  @media screen and (max-width: 1279px) {
    & {
      left: calc(10% - 12.5px);
    }
  }
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

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ModalOverlay = (props) => {
  const { closeEffect } = props;

  return (
    <ModalBx>
      <ModalContent $isClose={closeEffect}>{props.children}</ModalContent>
    </ModalBx>
  );
};
const Backdrop = (props) => {
  return <Back onClick={props.onClose}></Back>;
};

const Modal = (props) => {
  const { onClose, closeEffect } = props;

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose}>{props.children}</Backdrop>,
        document.getElementById("overlay")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay closeEffect={closeEffect}>{props.children}</ModalOverlay>,
        document.getElementById("overlay")
      )}
    </>
  );
};
export default Modal;
