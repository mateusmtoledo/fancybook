import FriendRequest from "../components/FriendRequest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

const friendRequest = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
}

describe('FriendRequest', () => {
  it('renders requesting user\'s name and avatar', () => {
    render(
      <FriendRequest friendRequest={friendRequest} />
    );
    const requesterName = screen.getByText(/john doe/i);
    const requesterAvatar = screen.getByAltText(/john's avatar/i);
    expect(requesterName).toBeInTheDocument();
    expect(requesterAvatar.src).toBe('https://someurl/john.png');
  });

  it('renders accept and decline buttons', () => {
    render(
      <FriendRequest friendRequest={friendRequest} />
    );
    const acceptButton = screen.getByAltText(/accept/i);
    const declineButton = screen.getByAltText(/decline/i);
    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
  });
});
