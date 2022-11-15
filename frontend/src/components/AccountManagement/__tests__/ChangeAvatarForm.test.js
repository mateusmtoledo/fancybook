import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangeAvatarForm from '../ChangeAvatarForm';
import ReactDOM from 'react-dom';
import api from '../../../adapters/api';
import { UserContext } from 'src/contexts/UserContext';
import { ToastContext } from 'src/contexts/ToastContext';
import userEvent from '@testing-library/user-event';
import { GlobalLoadingContext } from 'src/contexts/GlobalLoadingContext';

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
  api.put.mockImplementation((_, { avatar }) =>
    Promise.resolve({
      data: {
        user: { ...user, avatar: 'https://someurl/notjohn.png' },
      },
    }),
  );
  URL.createObjectURL = jest.fn().mockImplementation((file) => file.name);
});

describe('ChangeAvatarForm', () => {
  it('allows users to upload their images', () => {
    const file = new File(['somerandomfile'], 'foo.png', {
      type: 'image/png',
    });
    render(
      <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
        <UserContext.Provider value={{ user }}>
          <ChangeAvatarForm />
        </UserContext.Provider>
      </ToastContext.Provider>,
    );
    const fileInput = screen.getByLabelText('Avatar');
    userEvent.upload(fileInput, file);
    const avatarPreview = screen.getByRole('img');
    expect(avatarPreview.src).toBe('http://localhost/foo.png');
  });

  it('calls api.put with correct arguments', async () => {
    const file = new File(['somerandomfile'], 'foo.png', {
      type: 'image/png',
    });
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser: jest.fn() }}>
            <ChangeAvatarForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const fileInput = screen.getByLabelText('Avatar');
    userEvent.upload(fileInput, file);
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(api.put.mock.calls[0][0]).toBe('/users/me/avatar');
    });
    expect(api.put.mock.calls[0][1]).toMatchObject({
      avatar: 'data:image/png;base64,c29tZXJhbmRvbWZpbGU=',
    });
  });

  it('displays invalid image message on bad request response', async () => {
    const setUser = jest.fn();
    const file = new File(['somerandomfile'], 'foo.png', {
      type: 'image/png',
    });
    api.put.mockRejectedValue({
      response: {
        status: 400,
      },
    });
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser }}>
            <ChangeAvatarForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const fileInput = screen.getByLabelText('Avatar');
    userEvent.upload(fileInput, file);
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(await screen.findByText(/invalid image file/i)).toBeInTheDocument();
  });

  it('displays server error message on internal server error response', async () => {
    const setUser = jest.fn();
    const file = new File(['somerandomfile'], 'foo.png', {
      type: 'image/png',
    });
    api.put.mockRejectedValue({
      response: {
        status: 500,
      },
    });
    render(
      <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserContext.Provider value={{ user, setUser }}>
            <ChangeAvatarForm setFormVisible={jest.fn()} />
          </UserContext.Provider>
        </ToastContext.Provider>
      </GlobalLoadingContext.Provider>,
    );
    const fileInput = screen.getByLabelText('Avatar');
    userEvent.upload(fileInput, file);
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(await screen.findByText(/server error/i)).toBeInTheDocument();
  });
});
