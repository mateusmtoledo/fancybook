import styled from "styled-components";
import Card from "../../styles/Card";
import Post from "./Post";
import PostForm from "./PostForm";
import NO_DATA_IMG from "../../img/no-data.svg";
import NextPageButton from "./NextPageButton";
import { useEffect } from "react";
import { UserContext } from "src/contexts/UserContext";
import { useContext } from "react";
import PostSkeleton from "../Skeletons/PostSkeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import PostFormSkeleton from "../Skeletons/PostFormSkeleton";

const NoPosts = styled(Card)`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 28px;
  img, p {
    opacity: 0.8;
  }
`;

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 3 700px;

  @media (max-width: 650px) {
    flex: 1;
  }
`;

function PostList({
  posts,
  setPosts,
  postsLoading,
  hasNextPage,
  refreshPosts,
  loadNextPostPage,
  renderForm,
}) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    setPosts((previousPosts) => previousPosts.map((post) =>
      post.author._id === user._id
        ? { ...post, author: user }
        : post
    ));
  }, [user, setPosts]);

  if (!posts.length) {
    return (
      <SkeletonTheme baseColor="var(--color-brown)" highlightColor="var(--color-brown-light)" duration={2.5}>
        <StyledPostList>
          { renderForm && <PostFormSkeleton /> }
          {
            new Array(4).fill().map((_, index) => (
              <PostSkeleton key={index} />
            ))
          }
        </StyledPostList>
      </SkeletonTheme>
    );
  }

  return (
    <StyledPostList>
      { renderForm && <PostForm refreshPosts={refreshPosts} /> }
      {
        posts.length
        ? posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
        : <NoPosts>
            <img
              src={NO_DATA_IMG}
              alt="No posts found"
              width="128px"
              height="128px"
            />
            <p>No posts found</p>
          </NoPosts>
      }
      <NextPageButton
        hasNextPage={hasNextPage}
        loadNextPostPage={loadNextPostPage}
        postsLoading={postsLoading}
      />
    </StyledPostList>
  );
}

export default PostList;
