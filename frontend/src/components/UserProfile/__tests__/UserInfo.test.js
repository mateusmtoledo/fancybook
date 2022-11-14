import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserInfo from '../UserInfo';
import { UserContext } from '../../../contexts/UserContext';
import { ToastContext } from '../../../contexts/ToastContext';

const currentUser = {
  _id: 'johnsid',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
};

const user = {
  _id: 'janesid',
  firstName: 'Jane',
  lastName: 'Doe',
  fullName: 'Jane Doe',
  avatar: 'https://someurl/jane.png',
};

describe('UserInfo component', () => {
  it('renders user data', () => {
    render(
      <UserContext.Provider
        value={{
          user: currentUser,
          friends: {
            sent: [],
            pending: [],
            friends: [],
          },
        }}
      >
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserInfo user={user} friendshipStatus={null} />
        </ToastContext.Provider>
      </UserContext.Provider>,
    );
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByAltText(/jane's avatar/i).src).toBe(
      'https://someurl/jane.png',
    );
  });

  it('renders add button when users are not friends', () => {
    render(
      <UserContext.Provider
        value={{
          user: currentUser,
          friends: {
            sent: [],
            pending: [],
            friends: [],
          },
        }}
      >
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserInfo user={user} friendshipStatus={null} />
        </ToastContext.Provider>
      </UserContext.Provider>,
    );
    const addButton = screen.getByText(/add/i);
    expect(addButton).toBeInTheDocument();
  });

  it('renders accept and decline buttons if there is a pending request from user', () => {
    render(
      <UserContext.Provider
        value={{
          user: currentUser,
          friends: {
            sent: [],
            pending: [user],
            friends: [],
          },
        }}
      >
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserInfo user={user} friendshipStatus="pending" />
        </ToastContext.Provider>
      </UserContext.Provider>,
    );
    const acceptButton = screen.getByText(/accept/i);
    const declineButton = screen.getByText(/decline/i);
    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
  });

  it('renders cancel button if there is a sent request to user', () => {
    render(
      <UserContext.Provider
        value={{
          user: currentUser,
          friends: {
            sent: [user],
            pending: [],
            friends: [],
          },
        }}
      >
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserInfo user={user} friendshipStatus="sent" />
        </ToastContext.Provider>
      </UserContext.Provider>,
    );
    const cancelButton = screen.getByText(/cancel/i);
    expect(cancelButton).toBeInTheDocument();
  });

  it('renders remove button if users are friends', () => {
    render(
      <UserContext.Provider
        value={{
          user: currentUser,
          friends: {
            sent: [],
            pending: [],
            friends: [user],
          },
        }}
      >
        <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
          <UserInfo user={user} friendshipStatus="friends" />
        </ToastContext.Provider>
      </UserContext.Provider>,
    );
    const removeButton = screen.getByText(/remove/i);
    expect(removeButton).toBeInTheDocument();
  });
});
