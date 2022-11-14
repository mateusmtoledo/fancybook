import styled from 'styled-components';
import ToastNotification from './ToastNotification';
import ReactDOM from 'react-dom';
import { useContext } from 'react';
import { ToastContext } from '../../contexts/ToastContext';

const ToastNotificationListContainer = styled.div`
  background: none;
  position: fixed;
  bottom: 64px;
  right: 16px;
  width: max-content;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  z-index: 1;
  gap: 16px;
  height: max-content;

  @media (max-width: 450px) {
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;

function ToastNotificationList() {
  const { notifications } = useContext(ToastContext);

  return ReactDOM.createPortal(
    <ToastNotificationListContainer>
      {notifications.map((notification) => (
        <ToastNotification {...notification} />
      ))}
    </ToastNotificationListContainer>,
    document.getElementById('toast'),
  );
}

export default ToastNotificationList;
