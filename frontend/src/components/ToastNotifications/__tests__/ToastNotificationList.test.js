import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastNotificationList from '../ToastNotificationList';
import { ToastContext } from 'src/contexts/ToastContext';
import ReactDOM from 'react-dom';

const notifications = [
  {
    key: 1,
    type: 'info',
    text: 'Some informational message',
  },
  {
    key: 2,
    type: 'error',
    text: 'Some error message',
  },
  {
    key: 3,
    type: 'warning',
    text: 'Some warning message',
  },
  {
    key: 4,
    type: 'success',
    text: 'Some success message',
  },
];

beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element) => {
    return element;
  });
});

describe('ToastNotificationList component', () => {
  it('renders list of notifications', () => {
    render(
      <ToastContext.Provider
        value={{ notifications, sendNotification: jest.fn() }}
      >
        <ToastNotificationList />
      </ToastContext.Provider>,
    );
    expect(screen.getByText('Some informational message')).toBeInTheDocument();
    expect(screen.getByText('Some error message')).toBeInTheDocument();
    expect(screen.getByText('Some warning message')).toBeInTheDocument();
    expect(screen.getByText('Some success message')).toBeInTheDocument();
  });
});
