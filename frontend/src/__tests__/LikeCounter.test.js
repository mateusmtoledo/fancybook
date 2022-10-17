import { render, screen } from "@testing-library/react";
import LikeCounter from "../components/Likes/LikeCounter";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

const count = 2;

const likes = [
  {
    _id: 'johnslike',
    author: {
      _id: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      avatar: 'https://someurl/john.png',
    },
  },
  {
    _id: 'janeslike',
    author: {
      _id: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      fullName: 'Jane Doe',
      avatar: 'https://someurl/jane.png',
    },
  }
];

beforeEach(() => {
  ReactDOM.createPortal = jest.fn((element, node) => {
    return element;
  });
  // eslint-disable-next-line no-global-assign
  IntersectionObserver = jest.fn(() => {
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
    }
  });
});

describe('LikeCounter component', () => {
  it('renders correct number of likes', () => {
    render(
      <MemoryRouter>
        <LikeCounter likes={likes} count={count} />
      </MemoryRouter>
    );
    expect(screen.getByText(/2 likes/i)).toBeInTheDocument();
  });

  it('shows list of likes when clicked', async () => {
    render(
      <MemoryRouter>
        <LikeCounter likes={likes} count={count} />
      </MemoryRouter>
    );
    userEvent.click(screen.getByText(/2 likes/i));
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();
    expect(screen.getByAltText(/close/i)).toBeInTheDocument();
  });

  it('displays close button when list is visible', async () => {
    render(
      <MemoryRouter>
        <LikeCounter likes={likes} count={count} />
      </MemoryRouter>
    );
    userEvent.click(screen.getByText(/2 likes/i));
    expect(await screen.findByAltText(/close/i)).toBeInTheDocument();
  });
});
