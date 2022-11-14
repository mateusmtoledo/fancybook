import { renderHook, waitFor } from '@testing-library/react';
import useFriends from '../useFriends';
import api from '../../adapters/api';
import { act } from 'react-dom/test-utils';

jest.mock('../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});

const friends = [
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
];

const moreFriends = [
  {
    _id: 'notjohnsid',
    firstName: 'Notjohn',
    lastName: 'Notdoe',
    fullName: 'Notjohn Notdoe',
    avatar: 'https://someurl/Notjohn.png',
  },
];

beforeEach(() => {
  api.get.mockResolvedValueOnce({
    data: {
      friends,
    },
  });
  api.get.mockResolvedValueOnce({
    data: {
      friends: moreFriends,
    },
  });
});

describe('useFriends hook', () => {
  it('calls api.get with correct arguments', async () => {
    renderHook(() => useFriends('someUserId'));
    await waitFor(() => {
      expect(api.get.mock.calls[0][0]).toBe('/users/someUserId/friends');
    });
    expect(api.get.mock.calls[0][1]).toMatchObject({
      params: {
        page: 1,
      },
    });
  });

  describe('loadNextFriendsPage fn', () => {
    it('fetches friends from api', async () => {
      const { result } = renderHook(() => useFriends('someUserId'));
      await waitFor(() => expect(result.current.friends.length).toBe(2));
      expect(result.current.friends[1].firstName).toBe('Jane');
    });

    it('adds new friends to the array', async () => {
      const { result } = renderHook(() => useFriends('someUserId'));
      act(() => result.current.loadNextFriendsPage());
      await waitFor(() => expect(result.current.friends.length).toBe(3));
      expect(result.current.friends[2].firstName).toBe('Notjohn');
    });
  });
});
