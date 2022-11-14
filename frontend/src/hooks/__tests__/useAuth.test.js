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
    window.history.replaceState(null, '', window.origin + '?token=sometoken');
    const { result } = renderHook(() => useAuth());
    await waitFor(() => expect(result.current.user.firstName).toBe('John'));
    expect(localStorage.getItem('token')).toBe('sometoken');
    expect(api.get).toBeCalled();
  });

  it('removes token when api responds with an error', async () => {
    localStorage.setItem('token', 'sometoken');
    api.get.mockRejectedValue();
    renderHook(() => useAuth());
    await waitFor(() => expect(localStorage.getItem('token')).toBe(null));
  });

  describe('logout fn', () => {
    it('sets user to null', async () => {
      localStorage.setItem('token', 'sometoken');
      const { result } = renderHook(() => useAuth());
      await waitFor(() => expect(result.current.user.firstName).toBe('John'));
      act(() => {
        result.current.logout();
      });
      expect(localStorage.getItem('token')).toBe(null);
      expect(result.current.user).toBe(null);
    });
  });
});
