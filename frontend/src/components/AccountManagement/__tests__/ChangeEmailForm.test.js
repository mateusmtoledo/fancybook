import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../../contexts/UserContext';
import { ToastContext } from '../../../contexts/ToastContext';
import { GlobalLoadingContext } from '../../../contexts/GlobalLoadingContext';
import ReactDOM from 'react-dom';
import api from '../../../adapters/api';
import ChangeEmailForm from '../ChangeEmailForm';

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
  api.put.mockImplementation((_, { email }) =>
    Promise.resolve({
      data: {
        user: { ...user, email },
      },
    }),
  );
});

describe('ChangeEmailForm', () => {
  it('renders initial field values from user object', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeEmailForm />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput.value).toBe('johndoe@fancybook.com');
  });

  it('accepts user input', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeEmailForm />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'notjohndoe@gmail.com');
    expect(emailInput.value).toBe('notjohndoe@gmail.com');
  });

  it('calls api.put with correct arguments', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeEmailForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'notjohndoe@gmail.com');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(api.put.mock.calls[0][0]).toBe('/users/me/email');
    expect(api.put.mock.calls[0][1]).toMatchObject({
      email: 'notjohndoe@gmail.com',
    });
  });

  it('shows error message on api invalid input error', async () => {
    api.put.mockRejectedValue({
      response: {
        data: {
          invalidFields: {
            email: {
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
            <ChangeEmailForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'A');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(await screen.findByText('some error message')).toBeInTheDocument();
  });

  describe('cancel button', () => {
    it('sets form visible to false', () => {
      const setFormVisible = jest.fn();
      render(
        <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <UserContext.Provider value={{ user, setUser: jest.fn() }}>
              <ChangeEmailForm setFormVisible={setFormVisible} />
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
