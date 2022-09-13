import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import UserInfo from "../components/UserInfo";

const user = {
  _id: 'johnsid',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
}

describe('UserInfo component', () => {
  it('renders user data', () => {
    render(
      <UserInfo user={user} />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText(/john's avatar/i).src).toBe('https://someurl/john.png');
  });
});
