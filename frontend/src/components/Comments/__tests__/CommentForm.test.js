import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CommentForm from '../CommentForm';
import { UserContext } from 'src/contexts/UserContext';
import { ToastContext } from 'src/contexts/ToastContext';
import { MemoryRouter } from 'react-router-dom';
import api from '../../../adapters/api';

jest.mock('../../../adapters/api', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
});

const user = {
  _id: 'johnsid',
  bio: 'I am john doe.',
  email: 'johndoe@fancybook.com',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  avatar: 'https://someurl/john.png',
};

const props = {
  postId: 'somepostid',
  setComments: jest.fn(),
};

beforeEach(() => {
  api.post.mockResolvedValue({
    data: {
      comment: {},
    },
  });
});

describe('CommentForm', () => {
  it('renders comment input', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <CommentForm {...props} />
          </ToastContext.Provider>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const commentInput = screen.getByLabelText(/comment/i);
    expect(commentInput).toBeInTheDocument();
  });

  it('renders submit button after clicked', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <CommentForm {...props} />
          </ToastContext.Provider>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const commentInput = screen.getByLabelText(/comment/i);
    userEvent.click(commentInput);
    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeInTheDocument();
  });

  it('calls api.post with correct arguments', async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <CommentForm {...props} />
          </ToastContext.Provider>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const commentInput = screen.getByLabelText(/comment/i);
    userEvent.click(commentInput);
    userEvent.type(commentInput, 'I love fancybook');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    await waitFor(() =>
      expect(screen.queryByText(/submit/i)).not.toBeInTheDocument(),
    );
    expect(api.post.mock.calls[0][0]).toBe('/posts/somepostid/comments');
    expect(api.post.mock.calls[0][1]).toMatchObject({
      text: 'I love fancybook',
    });
  });

  it('displays error message when comment is invalid', async () => {
    api.post.mockRejectedValue({
      response: {
        data: {
          invalidFields: {
            text: {
              msg: 'some error message',
            },
          },
        },
      },
    });
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user }}>
          <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
            <CommentForm {...props} />
          </ToastContext.Provider>
        </UserContext.Provider>
      </MemoryRouter>,
    );
    const commentInput = screen.getByLabelText(/comment/i);
    userEvent.click(commentInput);
    userEvent.type(commentInput, 'A');
    const submitButton = screen.getByText(/submit/i);
    userEvent.click(submitButton);
    expect(await screen.findByText('some error message')).toBeInTheDocument();
  });

  describe('cancel button', () => {
    it('resets input and hides buttons', () => {
      render(
        <MemoryRouter>
          <UserContext.Provider value={{ user }}>
            <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
              <CommentForm {...props} />
            </ToastContext.Provider>
          </UserContext.Provider>
        </MemoryRouter>,
      );
      const commentInput = screen.getByLabelText(/comment/i);
      userEvent.click(commentInput);
      userEvent.type(commentInput, 'I love fancybook');
      const cancelButton = screen.getByText(/cancel/i);
      userEvent.click(cancelButton);
      expect(cancelButton).not.toBeInTheDocument();
      expect(commentInput.value).toBe('');
    });
  });
});
