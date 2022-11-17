import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendshipButtons from '../FriendshipButtons';
import { UserContext } from 'src/contexts/UserContext';
import userEvent from '@testing-library/user-event';
import api from 'src/adapters/api';

const user = {
  _id: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
};

const props = {
  setFriendshipStatus: jest.fn(),
  targetUserId: 'targetuserid',
  setFriends: jest.fn(),
  setFriendCount: jest.fn(),
};

jest.mock('../../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
});

const reloadMock = jest.fn();
delete window.location;
window.location = {
  reload: reloadMock,
};

describe('FriendshipButtons', () => {
  describe('when status is "sent"', () => {
    it('renders cancel button', () => {
      render(
        <UserContext.Provider value={{ user }}>
          <FriendshipButtons friendshipStatus="sent" {...props} />
        </UserContext.Provider>,
      );
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    });

    describe('cancel button', () => {
      it('calls api.delete when clicked', () => {
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus="sent" {...props} />
          </UserContext.Provider>,
        );
        const cancelButton = screen.getByText(/cancel/i);
        userEvent.click(cancelButton);
        expect(api.delete).toBeCalled();
      });

      it('reloads page on error', async () => {
        api.delete.mockRejectedValue();
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus="sent" {...props} />
          </UserContext.Provider>,
        );
        const cancelButton = screen.getByText(/cancel/i);
        userEvent.click(cancelButton);
        await waitFor(() => expect(reloadMock).toBeCalled());
      });
    });
  });

  describe('when status is "pending"', () => {
    it('renders decline and accept buttons', () => {
      render(
        <UserContext.Provider value={{ user }}>
          <FriendshipButtons friendshipStatus="pending" {...props} />
        </UserContext.Provider>,
      );
      expect(screen.getByText(/decline/i)).toBeInTheDocument();
      expect(screen.getByText(/accept/i)).toBeInTheDocument();
    });

    describe('decline button', () => {
      it('calls api.delete when clicked', () => {
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus="pending" {...props} />
          </UserContext.Provider>,
        );
        const declineButton = screen.getByText(/decline/i);
        userEvent.click(declineButton);
        expect(api.delete).toBeCalled();
      });

      it('reloads page on error', async () => {
        api.delete.mockRejectedValue();
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus="pending" {...props} />
          </UserContext.Provider>,
        );
        const declineButton = screen.getByText(/decline/i);
        userEvent.click(declineButton);
        await waitFor(() => expect(reloadMock).toBeCalled());
      });
    });

    describe('accept button', () => {
      it('calls api.put when clicked', async () => {
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus="pending" {...props} />
          </UserContext.Provider>,
        );
        const acceptButton = screen.getByText(/accept/i);
        userEvent.click(acceptButton);
        expect(api.put).toBeCalled();
      });

      it('reloads page on error', async () => {
        api.put.mockRejectedValue();
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus="pending" {...props} />
          </UserContext.Provider>,
        );
        const acceptButton = screen.getByText(/accept/i);
        userEvent.click(acceptButton);
        await waitFor(() => expect(reloadMock).toBeCalled());
      });
    });
  });

  describe('when status is "friends"', () => {
    it('renders remove button', () => {
      render(
        <UserContext.Provider value={{ user }}>
          <FriendshipButtons friendshipStatus="friends" {...props} />
        </UserContext.Provider>,
      );
      expect(screen.getByText(/remove/i)).toBeInTheDocument();
    });

    describe('remove button', () => {
      it('calls api.delete when clicked', async () => {
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus="friends" {...props} />
          </UserContext.Provider>,
        );
        const removeButton = screen.getByText(/remove/i);
        userEvent.click(removeButton);
        expect(api.delete).toBeCalled();
      });

      it('reloads page on error', async () => {
        api.delete.mockRejectedValue();
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus="friends" {...props} />
          </UserContext.Provider>,
        );
        const removeButton = screen.getByText(/remove/i);
        userEvent.click(removeButton);
        await waitFor(() => expect(reloadMock).toBeCalled());
      });
    });
  });

  describe('when status is null', () => {
    it('renders add button', () => {
      render(
        <UserContext.Provider value={{ user }}>
          <FriendshipButtons friendshipStatus={null} {...props} />
        </UserContext.Provider>,
      );
      expect(screen.getByText(/add/i)).toBeInTheDocument();
    });

    describe('add button', () => {
      it('calls api.post when clicked', async () => {
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus={null} {...props} />
          </UserContext.Provider>,
        );
        const addButton = screen.getByText(/add/i);
        userEvent.click(addButton);
        expect(api.post).toBeCalled();
      });

      it('reloads page on error', async () => {
        api.post.mockRejectedValue();
        render(
          <UserContext.Provider value={{ user }}>
            <FriendshipButtons friendshipStatus={null} {...props} />
          </UserContext.Provider>,
        );
        const addButton = screen.getByText(/add/i);
        userEvent.click(addButton);
        await waitFor(() => expect(reloadMock).toBeCalled());
      });
    });
  });
});
