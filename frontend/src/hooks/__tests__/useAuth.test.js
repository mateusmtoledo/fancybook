import { renderHook, waitFor } from '@testing-library/react';
import useAuth from '../useAuth';
import api from '../../adapters/api';
import { act } from 'react-dom/test-utils';

jest.mock('../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
});

beforeEach(() => {
  api.get.mockResolvedValue({
    data: {
      user: {
        _id: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        avatar: 'https://someurl/john.png',
      },
    },
  });
});

describe('useAuth hook', () => {
  it('correctly sets user', async () => {
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.user.firstName).toBe('John'));
    expect(api.get).toBeCalledWith('/login');
  });

  describe('logout fn', () => {
    it('calls api.post with correct arguments', async () => {
      localStorage.setItem('token', 'sometoken');
      const { result } = renderHook(() => useAuth());
      await waitFor(() => expect(result.current.user.firstName).toBe('John'));
      act(() => {
        result.current.logout();
      });
      expect(api.post).toBeCalledWith('/logout');
      await waitFor(() => expect(result.current.user).toBe(null));
    });
  });
});
