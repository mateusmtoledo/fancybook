import { renderHook, waitFor } from '@testing-library/react';
import useLikes from '../useLikes';
import api from '../../adapters/api';
import { act } from 'react-dom/test-utils';

jest.mock('../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});

const currentDate = Date.now();

const likes = [
  {
    _id: 'johnslike',
    author: {
      _id: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      avatar: 'https://someurl/john.png',
    },
    date: currentDate - 1000,
  },
  {
    _id: 'janeslike',
    author: {
      _id: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      fullName: 'Jane Doe',
      avatar: 'https://someurl/jane.png',
    },
    date: currentDate,
  },
];

const moreLikes = [
  {
    _id: 'notjohnslike',
    author: {
      _id: 'notjohndoe',
      firstName: 'Notjohn',
      lastName: 'Notdoe',
      fullName: 'Notjohn Notdoe',
      avatar: 'https://someurl/notjohn.png',
    },
    date: currentDate - 1000,
  },
];

beforeEach(() => {
  api.get.mockResolvedValueOnce({
    data: {
      likes,
    },
  });
  api.get.mockResolvedValueOnce({
    data: {
      likes: moreLikes,
    },
  });
});

describe('useLikes hook', () => {
  it('does not fetch likes until next page is set', async () => {
    renderHook(() => useLikes('somePostId', 10, true));
    expect(api.get).not.toBeCalled();
  });

  it('sets initial likeCount and userHasLiked correctly', () => {
    const { result } = renderHook(() => useLikes('somePostId', 10, true));
    expect(result.current.likeCount).toBe(10);
    expect(result.current.userHasLiked).toBe(true);
  });

  it('calls api.get with correct arguments', async () => {
    const { result } = renderHook(() => useLikes('somePostId', 10, true));
    act(() => result.current.loadNextLikePage());
    await waitFor(() => {
      expect(api.get).toBeCalledWith('/posts/somePostId/likes', {
        params: { page: 1 },
      });
    });
  });

  describe('loadNextLikePage fn', () => {
    it('fetches likes from api', async () => {
      const { result } = renderHook(() => useLikes('somePostId', 10, true));
      act(() => result.current.loadNextLikePage());
      await waitFor(() => expect(result.current.likes.length).toBe(2));
      expect(result.current.likes[1].author.firstName).toBe('Jane');
    });

    it('adds new likes to the array', async () => {
      const { result } = renderHook(() => useLikes('somePostId', 10, true));
      act(() => result.current.loadNextLikePage());
      act(() => result.current.loadNextLikePage());
      await waitFor(() => expect(result.current.likes.length).toBe(3));
      expect(result.current.likes[2].author.firstName).toBe('Notjohn');
    });
  });
});
