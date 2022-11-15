import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../../contexts/UserContext';
import { ToastContext } from '../../../contexts/ToastContext';
import { GlobalLoadingContext } from '../../../contexts/GlobalLoadingContext';
import ChangeBioForm from '../ChangeBioForm';
import ReactDOM from 'react-dom';
import api from '../../../adapters/api';

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
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
};

beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element;
  });
  api.put.mockImplementation((_, { bio }) =>
    Promise.resolve({
      data: {
        user: { ...user, bio },
      },
    }),
  );
});

describe('ChangeBioForm', () => {
  it('renders initial field values from user object', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeBioForm />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const bioInput = screen.getByLabelText(/bio/i);
    expect(bioInput.value).toBe('I am john doe.');
  });

  it('accepts user input', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeBioForm />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const bioInput = screen.getByLabelText(/bio/i);
    userEvent.clear(bioInput);
    userEvent.type(bioInput, 'I am not john doe');
    expect(bioInput.value).toBe('I am not john doe');
  });

  it('calls api.put with correct arguments', () => {
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeBioForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const bioInput = screen.getByLabelText(/bio/i);
    userEvent.clear(bioInput);
    userEvent.type(bioInput, 'I am not john doe');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(api.put.mock.calls[0][0]).toBe('/users/me/bio');
    expect(api.put.mock.calls[0][1]).toMatchObject({
      bio: 'I am not john doe',
    });
  });

  it('shows error message on api invalid input error', async () => {
    api.put.mockRejectedValue({
      response: {
        data: {
          invalidFields: {
            bio: {
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
            <ChangeBioForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const bioInput = screen.getByLabelText(/bio/i);
    userEvent.type(bioInput, 'A');
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
              <ChangeBioForm setFormVisible={setFormVisible} />
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
