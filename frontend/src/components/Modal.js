import { useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000b3;
`;

function Modal(props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.overflow = 'auto';
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay {...props} />,
    document.getElementById('portal'),
  );
}

export default Modal;
