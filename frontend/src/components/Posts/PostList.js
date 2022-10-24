import styled from "styled-components";
import Card from "../../styles/Card";
import Post from "./Post";
import PostForm from "./PostForm";
import NO_DATA_IMG from "../../img/no-data.svg";
import NextPageButton from "./NextPageButton";
import PostSkeleton from "../Skeletons/PostSkeleton";
import usePosts from "src/hooks/usePosts";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "src/contexts/UserContext";

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

function PostList({ userId, renderForm }) {
  const {
    posts,
    setPosts,
    hasNextPage,
    postsLoading,
    loadNextPostPage,
  } = usePosts(userId);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setPosts((previousPosts) => previousPosts.map((post) =>
      post.author._id === user._id
        ? { ...post, author: user }
        : post
    ));
  }, [user, setPosts]);

  return (
    <StyledPostList>
      { renderForm &&
        <PostForm
          postsLoading={postsLoading}
        />
      }
      {
        !!posts.length  &&
        posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      }
      {
        !postsLoading && !posts.length &&
        <NoPosts>
          <img
            src={NO_DATA_IMG}
            alt="No posts found"
            width="128px"
            height="128px"
          />
          <p>No posts found</p>
        </NoPosts>
      }
      {
        postsLoading &&
        new Array(8).fill().map((_, index) => (
          <PostSkeleton key={index} />
        ))
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
