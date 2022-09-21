import styled from "styled-components";
import Card from "../styles/Card";
import Post from "./Post";
import PostForm from "./PostForm";
import NO_DATA_IMG from "../img/no-data.svg";
import NextPageButton from "./NextPageButton";

const NoPosts = styled(Card)`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 48px;
  img, p {
    opacity: 0.8;
  }
`;

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 3 700px;
`;

function PostList({
  posts,
  refreshPosts,
  goToNextPage,
  postsLoading,
  hasNextPage,
  renderForm
}) {
  return (
    <StyledPostList>
      {
        renderForm
        ? <PostForm refreshPosts={refreshPosts} />
        : null
      }
      {
        posts.length
        ? posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
        : postsLoading
        ? null
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
        goToNextPage={goToNextPage}
        postsLoading={postsLoading}
      />
    </StyledPostList>
  );
}

export default PostList;
