import { renderHook, waitFor } from '@testing-library/react';
import useToastNotifications from '../useToastNotifications';
import { act } from 'react-dom/test-utils';

describe('useToastNotification hook', () => {
  it('generates keys that do not change', async () => {
    const keys = [];
    const { result } = renderHook(() => useToastNotifications());
    for (let i = 0; i < 3; i += 1) {
      act(() => result.current.sendNotification({}));
      await waitFor(() =>
        expect(result.current.notifications.length).toBe(i + 1),
      );
      keys.push(result.current.notifications[i].key);
    }
    expect(
      result.current.notifications.every((element) =>
        keys.includes(element.key),
      ),
    ).toBe(true);
  });

  it('clears notifications after duration is over', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToastNotifications());
    for (let i = 0; i < 3; i += 1) {
      act(() => result.current.sendNotification({}));
    }
    await waitFor(() => expect(result.current.notifications.length).toBe(3));
    act(() => jest.runAllTimers());
    await waitFor(() => expect(result.current.notifications.length).toBe(0));
  });
});
