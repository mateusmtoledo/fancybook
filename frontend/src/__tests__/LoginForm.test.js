import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { UserContext } from "../contexts/UserContext";
import Login from '../pages/Login';
import api from '../adapters/api';
import { ToastContext } from "src/contexts/ToastContext";
import ReactDOM from "react-dom";

jest.mock('../adapters/api', () => {
  return {
    post: jest.fn().mockResolvedValue(),
  }
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  Link: ({children}) => (
    <>
      {children}
    </>
  ),
}));

const loginMock = jest.fn();

beforeEach(() => {
  api.post.mockResolvedValue({
    data: {
      user: {
        firstName: 'John',
      },
      token: 'some random token',
    },
  });
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element;
  });
});


describe('Login form', () => {
  api.post.mockResolvedValue({
    data: {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      token: 'Some random token',
    },
  });

  it('renders inputs', () => {
    render(
      <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
        <UserContext.Provider value={{
          user: null,
          login: loginMock,
        }}>
          <Login />
        </UserContext.Provider>
      </ToastContext.Provider>
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
      <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
        <UserContext.Provider value={{
          user: null,
          login: loginMock,
        }}>
          <Login />
        </UserContext.Provider>
      </ToastContext.Provider>
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByDisplayValue(/sign in/i);
    userEvent.type(emailInput, 'johndoe@fancybook.com');
    userEvent.type(passwordInput, 'johndoe123');
    userEvent.click(submitButton);
    const loading = await screen.findByTestId('global-loading');
    await waitFor(() => expect(loading).not.toBeInTheDocument());
    expect(api.post).toBeCalledWith('/login', {
      email: 'johndoe@fancybook.com',
      password: 'johndoe123',
    });
  });
});
