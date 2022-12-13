import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../../contexts/UserContext';
import api from '../../../adapters/api';
import { ToastContext } from '../../../contexts/ToastContext';
import { GlobalLoadingContext } from '../../../contexts/GlobalLoadingContext';
import SampleUserButton from '../SampleUserButton';

jest.mock('../../../adapters/api', () => {
  return {
    post: jest.fn(),
  };
});

beforeEach(() => {
  api.post.mockResolvedValue({
    data: {},
  });
});

describe('SampleUserButton', () => {
  describe('when clicked', () => {
    it('calls api.post with correct arguments', () => {
      render(
        <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <UserContext.Provider
              value={{
                user: null,
                login: jest.fn(),
              }}
            >
              <SampleUserButton />
            </UserContext.Provider>
          </ToastContext.Provider>
          ,
        </GlobalLoadingContext.Provider>,
      );
      const sampleUserButton = screen.getByText(/i don't want to sign up/i);
      userEvent.click(sampleUserButton);
      expect(api.post).toBeCalledWith('/login/sample');
    });

    it('calls sendNotification on error', async () => {
      api.post.mockRejectedValue();
      const sendNotificationMock = jest.fn();
      render(
        <GlobalLoadingContext.Provider value={{ setGlobalLoading: jest.fn() }}>
          <ToastContext.Provider
            value={{ sendNotification: sendNotificationMock }}
          >
            <UserContext.Provider
              value={{
                user: null,
                login: jest.fn(),
              }}
            >
              <SampleUserButton />
            </UserContext.Provider>
          </ToastContext.Provider>
          ,
        </GlobalLoadingContext.Provider>,
      );
      const sampleUserButton = screen.getByText(/i don't want to sign up/i);
      userEvent.click(sampleUserButton);
      await waitFor(() =>
        expect(sendNotificationMock).toBeCalledWith(
          expect.objectContaining({
            type: 'error',
          }),
        ),
      );
    });
  });
});
