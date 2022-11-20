import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendRequestList from '../FriendRequestList';
import api from 'src/adapters/api';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});

const friendRequests = [
  {
    _id: 'johnsid',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    avatar: 'https://someurl/john.png',
  },
  {
    _id: 'janesid',
    firstName: 'Jane',
    lastName: 'Doe',
    fullName: 'Jane Doe',
    avatar: 'https://someurl/jane.png',
  },
  {
    _id: 'notjohnsid',
    firstName: 'Notjohn',
    lastName: 'Notdoe',
    fullName: 'Notjohn Notdoe',
    avatar: 'https://someurl/Notjohn.png',
  },
];

beforeEach(() => {
  api.get.mockResolvedValue({
    data: {
      friendRequests,
    },
  });
});

describe('FriendRequestList', () => {
  it('calls api.get with correct arguments', async () => {
    render(
      <MemoryRouter>
        <FriendRequestList />
      </MemoryRouter>,
    );
    await waitFor(() =>
      expect(api.get).toBeCalledWith('/users/me/friend-requests'),
    );
  });

  it('renders friend requests', async () => {
    render(
      <MemoryRouter>
        <FriendRequestList />
      </MemoryRouter>,
    );
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
    expect(await screen.findByText('Notjohn Notdoe')).toBeInTheDocument();
  });
});
