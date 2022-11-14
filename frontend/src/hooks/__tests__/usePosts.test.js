import { renderHook, waitFor } from '@testing-library/react';
import usePosts from '../usePosts';
import api from '../../adapters/api';
import { act } from 'react-dom/test-utils';

jest.mock('../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});

const posts = [
  {
    _id: 'johnspost',
    text: "John's post",
    author: {
      _id: 'johnsid',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      avatar: 'https://someurl/john.png',
    },
  },
  {
    _id: 'janespost',
    text: "Jane's post",
    author: {
      _id: 'janesid',
      firstName: 'Jane',
      lastName: 'Doe',
      fullName: 'Jane Doe',
      avatar: 'https://someurl/jane.png',
    },
  },
];

const morePosts = [
  {
    _id: 'johnssecondpost',
    text: "John's second post",
    author: {
      _id: 'johnsid',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      avatar: 'https://someurl/john.png',
    },
  },
];

beforeEach(() => {
  api.get.mockResolvedValueOnce({
    data: {
      posts,
    },
  });
  api.get.mockResolvedValueOnce({
    data: {
      posts: morePosts,
    },
  });
});

describe('usePosts hook', () => {
  describe('calls api.get with correct arguments when', () => {
    it('userId is not passed', async () => {
      renderHook(() => usePosts());
      await waitFor(() => {
        expect(api.get.mock.calls[0][0]).toBe('/posts');
      });
      expect(api.get.mock.calls[0][1]).toMatchObject({
        params: {
          page: 1,
        },
      });
    });

    it('userId is passed', async () => {
      renderHook(() => usePosts('someUserId'));
      await waitFor(() => {
        expect(api.get.mock.calls[0][0]).toBe('/users/someUserId/posts');
      });
      expect(api.get.mock.calls[0][1]).toMatchObject({
        params: {
          page: 1,
        },
      });
    });
  });

  it('fetches posts from api', async () => {
    const { result } = renderHook(() => usePosts());
    await waitFor(() => expect(result.current.posts.length).toBe(2));
    expect(result.current.posts[1].text).toBe("Jane's post");
  });

  describe('loadNextPostPage fn', () => {
    it('adds new posts to the array', async () => {
      const { result } = renderHook(() => usePosts());
      act(() => result.current.loadNextPostPage());
      await waitFor(() => expect(result.current.posts.length).toBe(3));
      expect(result.current.posts[2].text).toBe("John's second post");
    });
  });
});
