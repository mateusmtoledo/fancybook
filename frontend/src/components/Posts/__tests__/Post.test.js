import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from '../Post';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from 'src/contexts/UserContext';
import { ToastContext } from 'src/contexts/ToastContext';

const user = {
  _id: 'notjohnsid',
  firstName: 'Notjohn',
  lastName: 'Notdoe',
  fullName: 'Notjohn Notdoe',
  avatar: 'https://someurl/Notjohn.png',
};

const post = {
  _id: 'postid',
  text: 'I love fancybook!',
  author: user,
  date: Date.now() - 5000,
};

jest.mock('../../../hooks/useLikes', () => () => {
  let likes = [
    {
      _id: 'johnslike',
      author: {
        _id: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        avatar: 'https://someurl/john.png',
      },
      date: Date.now() - 1000,
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
      date: Date.now(),
    },
  ];
  let likeCount = 2;
  let likePageNumber = 1;
  let hasNextLikePage = false;
  let userHasLiked = false;
  const setLikes = (value) => (likes = value);
  const setLikeCount = (value) => (likeCount = value);
  const loadNextLikePage = () => (likePageNumber += 1);
  const setUserHasLiked = (value) => (userHasLiked = value);
  return {
    likes,
    setLikes,
    likeCount,
    setLikeCount,
    likePageNumber,
    hasNextLikePage,
    loadNextLikePage,
    userHasLiked,
    setUserHasLiked,
    likesLoading: false,
  };
});

jest.mock('../../../hooks/useComments', () => () => {
  let comments = [
    {
      _id: 'johnscomment',
      text: "John's comment",
      author: {
        _id: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        avatar: 'https://someurl/john.png',
      },
      date: Date.now() - 1000,
    },
    {
      _id: 'janescomment',
      text: "Jane's comment",
      author: {
        _id: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        fullName: 'Jane Doe',
        avatar: 'https://someurl/jane.png',
      },
      date: Date.now(),
    },
  ];
  let commentPageNumber = 1;
  const setComments = (value) => (comments = value);
  const loadNextCommentPage = (value) => (commentPageNumber = value);
  return {
    comments,
    setComments,
    loadNextCommentPage,
    commentPageNumber,
    hasNextCommentPage: false,
    commentCount: 2,
    commentsLoading: false,
  };
});

describe('Post component', () => {
  it('renders post info', () => {
    render(
      <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
        <UserContext.Provider value={{ user }}>
          <MemoryRouter>
            <Post post={post} />
          </MemoryRouter>
        </UserContext.Provider>
      </ToastContext.Provider>,
    );
    expect(screen.getByText('I love fancybook!')).toBeInTheDocument();
    expect(screen.getByText('Notjohn Notdoe')).toBeInTheDocument();
  });

  it('renders likes counter', () => {
    render(
      <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
        <UserContext.Provider value={{ user }}>
          <MemoryRouter>
            <Post post={post} />
          </MemoryRouter>
        </UserContext.Provider>
      </ToastContext.Provider>,
    );
    expect(screen.getByText(/2 likes/i)).toBeInTheDocument();
  });

  it('renders comment counter', () => {
    render(
      <ToastContext.Provider value={{ sendNotification: jest.fn() }}>
        <UserContext.Provider value={{ user }}>
          <MemoryRouter>
            <Post post={post} />
          </MemoryRouter>
        </UserContext.Provider>
      </ToastContext.Provider>,
    );
    expect(screen.getByText(/2 comments/i)).toBeInTheDocument();
  });
});
