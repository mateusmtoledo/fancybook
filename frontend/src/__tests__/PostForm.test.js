import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { UserContext } from "../contexts/UserContext";
import api from '../adapters/api';
import PostForm from "../components/PostForm";

const userContextValue = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
  },
  login: jest.fn(),
}

jest.mock('../adapters/api', () => {
  return {
    post: jest.fn(),
  }
});

describe('Post form', () => {
  it('renders text input', () => {
    render(
      <UserContext.Provider value={userContextValue}>
        <PostForm getPosts={jest.fn()} />
      </UserContext.Provider>
    );
    const textInput = screen.getByPlaceholderText(/share your thoughts/i);
    expect(textInput).toBeInTheDocument();
  });

  it('calls api.post with correct arguments', () => {
    render(
      <UserContext.Provider value={userContextValue}>
        <PostForm getPosts={jest.fn()} />
      </UserContext.Provider>
    );
    const textInput = screen.getByPlaceholderText(/share your thoughts/i);
    userEvent.type(textInput, 'I love fancybook!');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    expect(api.post).toBeCalledWith('/posts', {
      text: 'I love fancybook!',
    });
  });
});
