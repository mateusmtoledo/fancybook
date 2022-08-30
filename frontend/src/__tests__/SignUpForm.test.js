import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import api from '../adapters/api';
import SignUpForm from '../components/SignUpForm';

jest.mock('../adapters/api', () => {
  return {
    post: jest.fn(),
  }
});

describe('SignUp', () => {
  it('renders inputs', () => {
    render(
      <SignUpForm />
    );
    const firstName = screen.getByPlaceholderText(/first name/i);
    expect(firstName).toBeInTheDocument();
    const lastName = screen.getByPlaceholderText(/last name/i);
    expect(lastName).toBeInTheDocument();
    const genders = screen.getByRole('group');
    expect(genders).toHaveFormValues(/male/i, /female/i);
    const email = screen.getByPlaceholderText(/email/i);
    expect(email).toBeInTheDocument();
    const password = screen.getByPlaceholderText(/^password/i);
    expect(password).toBeInTheDocument();
    const confirmPassword = screen.getByPlaceholderText(/confirm password/i);
    expect(confirmPassword).toBeInTheDocument();
    const submitButton = screen.getByDisplayValue(/sign up/i);
    expect(submitButton).toBeInTheDocument();
  });

  it('calls api.post with correct arguments', () => {
    render(
      <SignUpForm />
    );
    const firstName = screen.getByPlaceholderText(/first name/i);
    userEvent.type(firstName, 'John');
    const lastName = screen.getByPlaceholderText(/last name/i);
    userEvent.type(lastName, 'Doe');
    const maleRadio = screen.getByLabelText(/^male/i);
    userEvent.click(maleRadio);
    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, 'johndoe@fancybook.com');
    const password = screen.getByPlaceholderText('Password');
    userEvent.type(password, 'johndoe123');
    const confirmPassword = screen.getByPlaceholderText(/confirm password/i);
    userEvent.type(confirmPassword, 'johndoe123');
    const submitButton = screen.getByDisplayValue(/sign up/i);
    userEvent.click(submitButton);
    expect(api.post).toBeCalledWith('/sign-up', {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      email: 'johndoe@fancybook.com',
      password: 'johndoe123',
    });
  });
});
