import FriendRequest from "../components/FriendRequest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { UserContext } from "../contexts/UserContext";
import userEvent from "@testing-library/user-event";
import api from "../adapters/api";
import { MemoryRouter } from "react-router-dom";

jest.mock('../adapters/api', () => {
  return {
    put: jest.fn(),
    delete: jest.fn(),
  }
});

const user = {
  _id: 'johnsid',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
}

const friendRequest = {
  _id: 'janesid',
  firstName: 'Jane',
  lastName: 'Doe',
  fullName: 'Jane Doe',
  avatar: 'https://someurl/jane.png',
}

describe('FriendRequest', () => {
  it('renders requesting user\'s name and avatar', () => {
    render(
      <UserContext.Provider value={{ user, refreshFriends: jest.fn() }}>
        <MemoryRouter>
          <FriendRequest
            friendRequest={friendRequest}
            refreshPosts={jest.fn()}
          />
        </MemoryRouter>
      </UserContext.Provider>
    );
    const requesterName = screen.getByText(/jane doe/i);
    const requesterAvatar = screen.getByAltText(/jane's avatar/i);
    expect(requesterName).toBeInTheDocument();
    expect(requesterAvatar.src).toBe('https://someurl/jane.png');
  });

  it('renders accept and decline buttons', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user, refreshFriends: jest.fn() }}>
          <FriendRequest
            friendRequest={friendRequest}
            refreshPosts={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const acceptButton = screen.getByAltText(/accept/i);
    const declineButton = screen.getByAltText(/decline/i);
    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
  });
});

describe('accept button', () => {
  it('calls api.put with correct arguments', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user, refreshFriends: jest.fn() }}>
          <FriendRequest
            friendRequest={friendRequest}
            refreshPosts={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const acceptButton = screen.getByAltText(/accept/i);
    userEvent.click(acceptButton);
    expect(api.put).toBeCalledWith('/users/janesid/friends');
  });
});

describe('decline button', () => {
  it('calls api.delete with correct arguments', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user, refreshFriends: jest.fn() }}>
          <FriendRequest
            friendRequest={friendRequest}
            refreshPosts={jest.fn()}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const declineButton = screen.getByAltText(/decline/i);
    userEvent.click(declineButton);
    expect(api.delete).toBeCalledWith('/users/janesid/friends');
  });
});
