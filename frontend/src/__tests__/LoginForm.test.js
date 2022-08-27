import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { UserContext } from "../contexts/UserContext";
import Login from '../pages/Login';
import api from '../adapters/api';

jest.mock('../adapters/api', () => {
  return {
    post: jest.fn(),
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
      <UserContext.Provider value={{
        user: null,
        login: loginMock,
      }}>
        <Login />
      </UserContext.Provider>
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    const submitButton = screen.getByDisplayValue(/sign in/i);
    expect(submitButton).toBeInTheDocument();
  });

  it('calls api with correct arguments', () => {
    render(
      <UserContext.Provider value={{
        user: null,
        login: loginMock,
      }}>
        <Login />
      </UserContext.Provider>
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByDisplayValue(/sign in/i);
    userEvent.type(emailInput, 'johndoe@fancybook.com');
    userEvent.type(passwordInput, 'johndoe123');
    userEvent.click(submitButton);
    expect(api.post).toHaveBeenCalledWith('/login', {
      email: 'johndoe@fancybook.com',
      password: 'johndoe123',
    });
  });
});
