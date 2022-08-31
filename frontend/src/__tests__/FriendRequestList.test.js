import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import api from '../adapters/api';
import FriendRequestList from "../components/FriendRequestList";
import { UserContext } from "../contexts/UserContext";

jest.mock('../adapters/api', () => {
  return {
    get: jest.fn(),
  }
});

let id = 0;

beforeEach(() => {
  api.get.mockImplementation(() => Promise.resolve({
    data: {
      user: {
        _id: id++,
        firstName: 'Firstname',
        lastName: 'Lastname',
        fullName: 'Fullname',
        avatar: 'SomeAvatarUrl',
      },
    },
  }));
});

const fakeUser = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  friendList: [
    {
        "user": "630b056ae8574eacc84b0e38",
        "status": "friends",
    },
    {
        "user": "630b056ae8574eacc84b0e3a",
        "status": "friends",
    },
    {
        "user": "630b056ae8574eacc84b0e3b",
        "status": "pending",
    },
    {
        "user": "630b056ae8574eacc84b0e3c",
        "status": "pending",
    },
    {
        "user": "630b056ae8574eacc84b0e3e",
        "status": "pending",
    },
    {
        "user": "630b056ae8574eacc84b0e3f",
        "status": "pending",
    },
    {
        "user": "630b056ae8574eacc84b0e39",
        "status": "sent",
    },
    {
        "user": "630b056ae8574eacc84b0e41",
        "status": "pending",
    }
  ],
}

describe('FriendRequestList', () => {
  it('calls api.post with correct arguments', async () => {
    render(
      <UserContext.Provider value={{ user: fakeUser }}>
        <FriendRequestList />
      </UserContext.Provider>
    );
    await screen.findAllByText(/fullname/i);
    expect(api.get).toHaveBeenCalledTimes(5);
    expect(api.get).toHaveBeenCalledWith('/users/630b056ae8574eacc84b0e41');
  });
});
