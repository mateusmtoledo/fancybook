import { renderHook, waitFor } from '@testing-library/react';
import useComments from '../useComments';
import api from '../../adapters/api';
import { act } from 'react-dom/test-utils';

jest.mock('../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});

const currentDate = Date.now();

const comments = [
  {
    _id: 'johnscomment',
    text: "John's comment",
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
    _id: 'janescomment',
    text: "Jane's comment",
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

const moreComments = [
  {
    _id: 'johnsothercomment',
    text: "John's second comment",
    author: {
      _id: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      avatar: 'https://someurl/john.png',
    },
    date: currentDate - 1000,
  },
];

beforeEach(() => {
  api.get.mockResolvedValueOnce({
    data: {
      comments,
    },
  });
  api.get.mockResolvedValueOnce({
    data: {
      comments: moreComments,
    },
  });
});

describe('useComments hook', () => {
  it('does not fetch comments until next page is set', async () => {
    renderHook(() => useComments('somePostId', 10));
    expect(api.get).not.toBeCalled();
  });

  it('sets initial commentCount correctly', () => {
    const { result } = renderHook(() => useComments('somePostId', 10));
    expect(result.current.commentCount).toBe(10);
  });

  it('calls api.get with correct arguments', async () => {
    const { result } = renderHook(() => useComments('somePostId', 10));
    act(() => result.current.loadNextCommentPage());
    await waitFor(() => {
      expect(api.get).toBeCalledWith('/posts/somePostId/comments', {
        params: { page: 1 },
      });
    });
  });

  describe('loadNextCommentPage fn', () => {
    it('fetches comments from api', async () => {
      const { result } = renderHook(() => useComments('somePostId', 10));
      act(() => result.current.loadNextCommentPage());
      await waitFor(() => expect(result.current.comments.length).toBe(2));
      expect(result.current.comments[1].text).toBe("Jane's comment");
    });

    it('adds new comments to the array', async () => {
      const { result } = renderHook(() => useComments('somePostId', 10));
      act(() => result.current.loadNextCommentPage());
      act(() => result.current.loadNextCommentPage());
      await waitFor(() => expect(result.current.comments.length).toBe(3));
      expect(result.current.comments[2].text).toBe("John's second comment");
    });
  });
});
