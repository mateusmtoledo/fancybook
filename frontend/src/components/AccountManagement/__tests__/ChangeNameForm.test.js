import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../../contexts/UserContext';
import { ToastContext } from '../../../contexts/ToastContext';
import { GlobalLoadingContext } from '../../../contexts/GlobalLoadingContext';
import ReactDOM from 'react-dom';
import api from '../../../adapters/api';
import ChangeNameForm from '../ChangeNameForm';

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
  api.put.mockImplementation((_, { firstName, lastName }) =>
    Promise.resolve({
      data: {
        user: { ...user, firstName, lastName },
      },
    }),
  );
});

describe('ChangeNameForm', () => {
  it('renders initial field values from user object', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeNameForm />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
  });

  it('accepts user input', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeNameForm />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.clear(firstNameInput);
    userEvent.type(firstNameInput, 'Notjohn');
    userEvent.clear(lastNameInput);
    userEvent.type(lastNameInput, 'Notdoe');
    expect(firstNameInput.value).toBe('Notjohn');
    expect(lastNameInput.value).toBe('Notdoe');
  });

  it('calls api.put with correct arguments', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeNameForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.clear(firstNameInput);
    userEvent.type(firstNameInput, 'Notjohn');
    userEvent.clear(lastNameInput);
    userEvent.type(lastNameInput, 'Notdoe');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(api.put.mock.calls[0][0]).toBe('/users/me/name');
    expect(api.put.mock.calls[0][1]).toMatchObject({
      firstName: 'Notjohn',
      lastName: 'Notdoe',
    });
  });

  it('shows error message on api invalid input error', async () => {
    api.put.mockRejectedValue({
      response: {
        data: {
          invalidFields: {
            firstName: {
              msg: 'some error message',
            },
            lastName: {
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
            <ChangeNameForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.clear(firstNameInput);
    userEvent.type(firstNameInput, 'A');
    userEvent.clear(lastNameInput);
    userEvent.type(lastNameInput, 'B');
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
              <ChangeNameForm setFormVisible={setFormVisible} />
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
