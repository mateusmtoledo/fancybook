import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import api from '../adapters/api';
import SignUpForm from '../components/SignUpForm';
import { MemoryRouter } from "react-router-dom";
import { ToastContext } from "src/contexts/ToastContext";
import ReactDOM from 'react-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../adapters/api', () => {
  return {
    post: jest.fn(),
  }
});

beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element;
  });
});

describe('SignUp', () => {
  it('renders inputs', () => {
    render(
      <MemoryRouter>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <SignUpForm />
        </ToastContext.Provider>
      </MemoryRouter>
    );
    const firstName = screen.getByPlaceholderText(/first name/i);
    expect(firstName).toBeInTheDocument();
    const lastName = screen.getByPlaceholderText(/last name/i);
    expect(lastName).toBeInTheDocument();
    const email = screen.getByPlaceholderText(/email/i);
    expect(email).toBeInTheDocument();
    const password = screen.getByPlaceholderText(/^password/i);
    expect(password).toBeInTheDocument();
    const confirmPassword = screen.getByPlaceholderText(/confirm password/i);
    expect(confirmPassword).toBeInTheDocument();
    const submitButton = screen.getByDisplayValue(/sign up/i);
    expect(submitButton).toBeInTheDocument();
  });

  it('calls api.post with correct arguments', async () => {
    render(
      <MemoryRouter>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <SignUpForm />
        </ToastContext.Provider>
      </MemoryRouter>
    );
    const firstName = screen.getByPlaceholderText(/first name/i);
    userEvent.type(firstName, 'John');
    const lastName = screen.getByPlaceholderText(/last name/i);
    userEvent.type(lastName, 'Doe');
    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, 'johndoe@fancybook.com');
    const password = screen.getByPlaceholderText('Password');
    userEvent.type(password, 'johndoe123');
    const confirmPassword = screen.getByPlaceholderText(/confirm password/i);
    userEvent.type(confirmPassword, 'johndoe123');
    const submitButton = screen.getByDisplayValue(/sign up/i);
    userEvent.click(submitButton);
    await waitFor(() => expect(api.post).toBeCalledWith('/sign-up', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@fancybook.com',
      password: 'johndoe123',
    }));
  });
});
