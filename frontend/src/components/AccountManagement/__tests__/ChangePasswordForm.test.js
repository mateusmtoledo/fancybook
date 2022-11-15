import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../../contexts/UserContext';
import { ToastContext } from '../../../contexts/ToastContext';
import { GlobalLoadingContext } from '../../../contexts/GlobalLoadingContext';
import ReactDOM from 'react-dom';
import api from '../../../adapters/api';
import ChangePasswordForm from '../ChangePasswordForm';

jest.mock('../../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  };
});

const user = {
  _id: 'johnsid',
  bio: 'I am john doe.',
  email: 'johndoe@fancybook.com',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
};

beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element;
  });
  api.put.mockImplementation((_, { password, newPassword }) =>
    Promise.resolve({
      data: {
        user,
      },
    }),
  );
});

describe('ChangePasswordForm', () => {
  it('accepts user input', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangePasswordForm />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const passwordInput = screen.getByLabelText(/^password$/i);
    const newPasswordInput = screen.getByLabelText(/^new password$/i);
    const confirmNewPasswordInput = screen.getByLabelText(
      /^confirm new password$/i,
    );
    userEvent.type(passwordInput, 'someoldpassword');
    expect(passwordInput.value).toBe('someoldpassword');
    userEvent.type(newPasswordInput, 'somenewpassword');
    expect(newPasswordInput.value).toBe('somenewpassword');
    userEvent.type(confirmNewPasswordInput, 'someconfirmnewpassword');
    expect(confirmNewPasswordInput.value).toBe('someconfirmnewpassword');
  });

  it('sets error if password confirmation does not match', async () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangePasswordForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const passwordInput = screen.getByLabelText(/^password$/i);
    const newPasswordInput = screen.getByLabelText(/^new password$/i);
    const confirmNewPasswordInput = screen.getByLabelText(
      /^confirm new password$/i,
    );
    userEvent.type(passwordInput, 'someoldpassword');
    expect(passwordInput.value).toBe('someoldpassword');
    userEvent.type(newPasswordInput, 'somenewpassword');
    expect(newPasswordInput.value).toBe('somenewpassword');
    userEvent.type(confirmNewPasswordInput, 'someconfirmnewpassword');
    expect(confirmNewPasswordInput.value).toBe('someconfirmnewpassword');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(
      await screen.findByText(/passwords don't match/i),
    ).toBeInTheDocument();
  });

  it('calls api.put with correct arguments', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangePasswordForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const passwordInput = screen.getByLabelText(/^password$/i);
    const newPasswordInput = screen.getByLabelText(/^new password$/i);
    const confirmNewPasswordInput = screen.getByLabelText(
      /^confirm new password$/i,
    );
    userEvent.type(passwordInput, 'someoldpassword');
    expect(passwordInput.value).toBe('someoldpassword');
    userEvent.type(newPasswordInput, 'somenewpassword');
    expect(newPasswordInput.value).toBe('somenewpassword');
    userEvent.type(confirmNewPasswordInput, 'somenewpassword');
    expect(confirmNewPasswordInput.value).toBe('somenewpassword');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(api.put.mock.calls[0][0]).toBe('/users/me/password');
    expect(api.put.mock.calls[0][1]).toMatchObject({
      password: 'someoldpassword',
      newPassword: 'somenewpassword',
    });
  });

  it('shows error message on api invalid input error', async () => {
    api.put.mockRejectedValue({
      response: {
        data: {
          invalidFields: {
            password: {
              msg: 'some error message',
            },
            newPassword: {
              msg: 'some error message',
            },
          },
        },
      },
    });
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangePasswordForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const passwordInput = screen.getByLabelText(/^password$/i);
    const newPasswordInput = screen.getByLabelText(/^new password$/i);
    const confirmNewPasswordInput = screen.getByLabelText(
      /^confirm new password$/i,
    );
    userEvent.type(passwordInput, 'someoldpassword');
    expect(passwordInput.value).toBe('someoldpassword');
    userEvent.type(newPasswordInput, 'somenewpassword');
    expect(newPasswordInput.value).toBe('somenewpassword');
    userEvent.type(confirmNewPasswordInput, 'somenewpassword');
    expect(confirmNewPasswordInput.value).toBe('somenewpassword');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect((await screen.findAllByText('some error message')).length).toBe(2);
  });

  describe('cancel button', () => {
    it('sets form visible to false', () => {
      const setFormVisible = jest.fn();
      render(
        <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <UserContext.Provider value={{ user, setUser: jest.fn() }}>
              <ChangePasswordForm setFormVisible={setFormVisible} />
            </UserContext.Provider>
          </ToastContext.Provider>
        </GlobalLoadingContext.Provider>,
      );
      const cancelButton = screen.getByText(/cancel/i);
      userEvent.click(cancelButton);
      expect(setFormVisible).toBeCalledWith(false);
    });
  });
});
