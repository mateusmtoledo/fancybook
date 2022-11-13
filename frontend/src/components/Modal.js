import { useEffect } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

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
  z-index: 100;
`;

const ModalContainer = styled.div`
  max-width: 100vw;
  padding: 8px;
`;

function Modal({ setModalVisible, children, portalElementId, ...props }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        if (setModalVisible) {
          setModalVisible(false);
        }
      }}
    >
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById(portalElementId || 'portal'),
  );
}

export default Modal;
