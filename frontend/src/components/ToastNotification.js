import { useMemo } from 'react';
import styled from 'styled-components';
import Card from '../styles/Card';
import WARNING_ICON from '../img/warning.svg';
import ERROR_ICON from '../img/error-circle.svg';
import SUCCESS_ICON from '../img/check-circle.svg';
import INFO_ICON from '../img/info-circle.svg';

function pickColor(type) {
  const result = {};
  switch (type) {
    case 'success':
      result.backgroundColor = '#4ba155';
      result.icon = SUCCESS_ICON;
      result.title = 'Success';
      break;
    case 'error':
      result.backgroundColor = '#c84243';
      result.icon = ERROR_ICON;
      result.title = 'Error';
      break;
    case 'warning':
      result.backgroundColor = '#e0954b';
      result.icon = WARNING_ICON;
      result.title = 'Warning';
      break;
    default:
      result.backgroundColor = '#3daac6';
      result.icon = INFO_ICON;
      result.title = 'Info';
      break;
  }
  return result;
}

const ToastContainer = styled(Card)`
  position: relative;
  background-color: ${(props) => props.bgColor};
  width: 350px;
  max-width: 96vw;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-auto-rows: max-content 1fr;
  gap: 4px 16px;
  overflow: hidden;

  img {
    grid-row: span 2;
  }
`;

const ToastTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

const ProgressBar = styled.div`
  background-color: white;
  position: absolute;
  width: 100%;
  height: 6px;
  bottom: 0;
  left: 0;
  animation: timer ${(props) => props.duration || '5s'} linear;
  animation-fill-mode: forwards;

  @keyframes timer {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

function ToastNotification({ type, text, duration, ...props }) {
  const properties = useMemo(() => pickColor(type), [type]);

  if (!properties) return null;

  return (
    <ToastContainer {...props} bgColor={properties.backgroundColor}>
      <img src={properties.icon} alt={type} width="48px" height="48px" />
      <ToastTitle>{properties.title}</ToastTitle>
      <p>{text}</p>
      <ProgressBar />
    </ToastContainer>
  );
}

export default ToastNotification;
