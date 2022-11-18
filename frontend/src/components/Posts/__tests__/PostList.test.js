import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostList from '../PostList';
import { UserContext } from 'src/contexts/UserContext';
import { MemoryRouter } from 'react-router-dom';
import { ToastContext } from 'src/contexts/ToastContext';

const user = {
  _id: 'notjohnsid',
  firstName: 'Notjohn',
  lastName: 'Notdoe',
  fullName: 'Notjohn Notdoe',
  avatar: 'https://someurl/Notjohn.png',
};

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockReturnValue({
    observe: jest.fn(),
    disconnect: jest.fn(),
  });
});

jest.mock('../../../hooks/usePosts', () => () => {
  let posts = [
    {
      _id: 'johnspost',
      text: 'I love fancybook!',
      author: {
        _id: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        avatar: 'https://someurl/john.png',
      },
      date: Date.now() - 2000,
    },
    {
      _id: 'janespost',
      text: 'Fancybook is great!',
      author: {
        _id: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        fullName: 'Jane Doe',
        avatar: 'https://someurl/jane.png',
      },
      date: Date.now() - 7000,
    },
    {
      _id: 'johnssecondpost',
      text: 'Fancybook restored my faith in humankind!',
      author: {
        _id: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        avatar: 'https://someurl/john.png',
      },
      date: Date.now() - 8000,
    },
  ];
  const setPosts = (newPosts) => (posts = newPosts);
  const hasNextPage = false;
  const postsLoading = false;
  const loadNextPostPage = jest.fn();

  return {
    posts,
    setPosts,
    hasNextPage,
    postsLoading,
    loadNextPostPage,
  };
});

describe('PostList component', () => {
  it('renders list of posts', () => {
    render(
      <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
        <UserContext.Provider value={{ user }}>
          <MemoryRouter>
            <PostList />
          </MemoryRouter>
        </UserContext.Provider>
      </ToastContext.Provider>,
    );
    expect(screen.getByText('I love fancybook!')).toBeInTheDocument();
    expect(screen.getByText('Fancybook is great!')).toBeInTheDocument();
    expect(
      screen.getByText('Fancybook restored my faith in humankind!'),
    ).toBeInTheDocument();
  });
});
