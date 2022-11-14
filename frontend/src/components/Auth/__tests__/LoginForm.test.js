import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../../contexts/UserContext';
import Login from '../../../pages/Login';
import api from '../../../adapters/api';
import { ToastContext } from '../../../contexts/ToastContext';
import ReactDOM from 'react-dom';
import { GlobalLoadingContext } from '../../../contexts/GlobalLoadingContext';

jest.mock('../../../adapters/api', () => {
  return {
    post: jest.fn().mockResolvedValue(),
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <>{children}</>,
}));

const loginMock = jest.fn();

beforeEach(() => {
  api.post.mockResolvedValue({
    data: {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      token: 'some random token',
    },
  });
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element;
  });
});

describe('Login form', () => {
  it('renders inputs', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider
            value={{
              user: null,
              login: loginMock,
            }}
          >
            <Login />
          </UserContext.Provider>
        </ToastContext.Provider>
        ,
      </GlobalLoadingContext.Provider>,
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    const submitButton = screen.getByDisplayValue(/sign in/i);
    expect(submitButton).toBeInTheDocument();
  });

  it('calls api with correct arguments', async () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider
            value={{
              user: null,
              login: loginMock,
            }}
          >
            <Login />
          </UserContext.Provider>
        </ToastContext.Provider>
        ,
      </GlobalLoadingContext.Provider>,
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByDisplayValue(/sign in/i);
    userEvent.type(emailInput, 'johndoe@fancybook.com');
    userEvent.type(passwordInput, 'johndoe123');
    userEvent.click(submitButton);
    expect(api.post).toBeCalledWith('/login', {
      email: 'johndoe@fancybook.com',
      password: 'johndoe123',
    });
  });
});
