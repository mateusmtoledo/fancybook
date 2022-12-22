import styled from 'styled-components';
import Post from './Post';
import PostForm from './PostForm';
import STICKY_NOTES_ICON from '../../img/sticky-notes.svg';
import PostSkeleton from '../Skeletons/PostSkeleton';
import usePosts from 'src/hooks/usePosts';
import { useContext } from 'react';
import { useEffect } from 'react';
import { UserContext } from 'src/contexts/UserContext';
import { useRef } from 'react';
import { useCallback } from 'react';

const NoPostsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoPostsMessage = styled.div`
  aspect-ratio: 1 / 1;
  height: 230px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 1.1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 100%;
  border: 3px solid white;
`;

const StyledPostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 3 700px;

  @media (max-width: 650px) {
    flex: 1;
  }
`;

function PostList({ userId, renderForm }) {
  const { posts, setPosts, hasNextPage, postsLoading, loadNextPostPage } =
    usePosts(userId);

  const { user } = useContext(UserContext);

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (postsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) loadNextPostPage();
      });
      if (node) observer.current.observe(node);
    },
    [loadNextPostPage, hasNextPage, postsLoading],
  );

  useEffect(() => {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.author._id === user._id ? { ...post, author: user } : post,
      ),
    );
  }, [user, setPosts]);

  return (
    <StyledPostList>
      {renderForm && (
        <PostForm setPosts={setPosts} postsLoading={postsLoading} />
      )}
      {!!posts.length &&
        posts.map((post, index) =>
          index + 1 === posts.length ? (
            <li key={post._id} ref={lastPostRef}>
              <Post post={post} />
            </li>
          ) : (
            <li key={post._id}>
              <Post key={post._id} post={post} />
            </li>
          ),
        )}
      {!postsLoading && !posts.length && (
        <NoPostsContainer>
          <NoPostsMessage>
            <img
              src={STICKY_NOTES_ICON}
              alt="No posts yet"
              width="84px"
              height="84px"
            />
            <p>No posts yet</p>
          </NoPostsMessage>
        </NoPostsContainer>
      )}
      {postsLoading &&
        new Array(8).fill().map((_, index) => <PostSkeleton key={index} />)}
    </StyledPostList>
  );
}

export default PostList;
