import { render, screen } from "@testing-library/react";
import Likes from "../components/Likes";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

const count = 2;

const likes = [
  {
    _id: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    avatar: 'https://someurl/john.png',
  },
  {
    _id: 'janedoe',
    firstName: 'Jane',
    lastName: 'Doe',
    fullName: 'Jane Doe',
    avatar: 'https://someurl/jane.png',
  },
];

describe('Likes component', () => {
  it('renders correct number of likes', () => {
    render(
      <Likes likes={likes} count={count} />
    );
    expect(screen.getByText(/2 likes/i)).toBeInTheDocument();
  });

  it('shows list of likes when clicked', async () => {
    render(
      <Likes likes={likes} count={count} />
    );
    userEvent.click(screen.getByText(/2 likes/i));
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();
    expect(screen.getByAltText(/close/i)).toBeInTheDocument();
  });

  it('displays close button when list is visible', async () => {
    render(
      <Likes likes={likes} count={count} />
    );
    userEvent.click(screen.getByText(/2 likes/i));
    expect(await screen.findByAltText(/close/i)).toBeInTheDocument();
  });
});
