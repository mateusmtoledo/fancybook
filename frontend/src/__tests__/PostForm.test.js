import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { UserContext } from "../contexts/UserContext";
import api from '../adapters/api';
import PostForm from "../components/PostForm";
import { MemoryRouter } from "react-router-dom";

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
      <MemoryRouter>
        <UserContext.Provider value={userContextValue}>
          <PostForm refreshPosts={jest.fn()} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const textInput = screen.getByPlaceholderText(/share your thoughts/i);
    expect(textInput).toBeInTheDocument();
  });

  it('calls api.post with correct arguments', async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={userContextValue}>
          <PostForm refreshPosts={jest.fn()} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const textInput = screen.getByPlaceholderText(/share your thoughts/i);
    userEvent.type(textInput, 'I love fancybook!');
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    await waitFor(() => expect(api.post).toBeCalledWith('/posts', {
      text: 'I love fancybook!',
    }));
  });
});
