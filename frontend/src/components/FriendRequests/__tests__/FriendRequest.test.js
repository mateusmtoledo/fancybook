import FriendRequest from '../FriendRequest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserContext } from '../../../contexts/UserContext';
import userEvent from '@testing-library/user-event';
import api from '../../../adapters/api';
import { MemoryRouter } from 'react-router-dom';
import { ToastContext } from 'src/contexts/ToastContext';

const location = window.location;
delete window.location;
window.location = {
  ...location,
  reload: jest.fn(),
};

jest.mock('../../../adapters/api', () => {
  return {
    put: jest.fn(),
    delete: jest.fn(),
  };
});

const user = {
  _id: 'johnsid',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
};

const friendRequest = {
  _id: 'janesid',
  firstName: 'Jane',
  lastName: 'Doe',
  fullName: 'Jane Doe',
  avatar: 'https://someurl/jane.png',
};

describe('FriendRequest', () => {
  it("renders requesting user's name and avatar", () => {
    render(
      <UserContext.Provider value={{ user }}>
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <MemoryRouter>
            <FriendRequest friendRequest={friendRequest} />
          </MemoryRouter>
        </ToastContext.Provider>
      </UserContext.Provider>,
    );
    const requesterName = screen.getByText(/jane doe/i);
    const requesterAvatar = screen.getByAltText(/jane's avatar/i);
    expect(requesterName).toBeInTheDocument();
    expect(requesterAvatar.src).toBe('https://someurl/jane.png');
  });

  it('renders accept and decline buttons', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <FriendRequest friendRequest={friendRequest} />
          </ToastContext.Provider>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const acceptButton = screen.getByText(/accept/i);
    const declineButton = screen.getByText(/decline/i);
    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
  });
});

describe('accept button', () => {
  it('calls api.put with correct arguments', async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <FriendRequest friendRequest={friendRequest} />
          </ToastContext.Provider>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const acceptButton = screen.getByText(/accept/i);
    userEvent.click(acceptButton);
    expect(api.put).toBeCalledWith('/users/janesid/friends');
    await waitFor(() =>
      expect(
        screen.queryByTestId('friend-request-loading'),
      ).not.toBeInTheDocument(),
    );
  });
});

describe('decline button', () => {
  it('calls api.delete with correct arguments', async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <FriendRequest friendRequest={friendRequest} />
          </ToastContext.Provider>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const declineButton = screen.getByText(/decline/i);
    userEvent.click(declineButton);
    expect(api.delete).toBeCalledWith('/users/janesid/friends');
    await waitFor(() =>
      expect(
        screen.queryByTestId('friend-request-loading'),
      ).not.toBeInTheDocument(),
    );
  });
});
