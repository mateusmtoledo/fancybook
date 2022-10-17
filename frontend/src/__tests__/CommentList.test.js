import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import CommentList from "../components/Comments/CommentList";
import { UserContext } from "../contexts/UserContext";

const currentDate = Date.now();

const comments = [
  {
    _id: 'johnscomment',
    text: 'John\'s comment',
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
    text: 'Jane\'s comment',
    author: {
      _id: 'janedoe',
      firstName: 'Jane',
      lastName: 'Doe',
      fullName: 'Jane Doe',
      avatar: 'https://someurl/jane.png',
    },
    date: currentDate,
  }
];

const currentUser = {
  _id: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
}

describe('CommentList', () => {
  it('renders list of comments', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: currentUser }}>
          <CommentList
            commentsVisible={true}
            comments={comments}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const johnsFullName = screen.getByText(/john doe/i);
    const janesFullName = screen.getByText(/jane doe/i);
    const johnsComment = screen.getByText(/john's comment/i);
    const janesComment = screen.getByText(/jane's comment/i);
    expect(johnsComment).toBeInTheDocument();
    expect(janesComment).toBeInTheDocument();
    expect(johnsFullName).toBeInTheDocument();
    expect(janesFullName).toBeInTheDocument();
  });

  it('renders a form for submiting a new comment', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: currentUser }}>
          <CommentList
            commentsVisible={true}
            comments={comments}
          />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const commentTextInput = screen.getByPlaceholderText(/comment on this post/i);
    expect(commentTextInput).toBeInTheDocument();
  });
});
