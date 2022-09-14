import styled from "styled-components";
import Loading from "./Loading";
import Post from "./Post";
import PostForm from "./PostForm";

const NextPageDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 48px;
  button {
    font-size: 1rem;
    padding: 8px 32px;
    font-family: 'Roboto', sans-serif;
    background-color: var(--color-brown-dark);
    color: var(--color-white);
    border: none;
    box-shadow: var(--shadow-card);
    border-radius: 8px;
    cursor: pointer;
  }
`

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 3 700px;
`;

function PostList({
  posts,
  refreshPosts,
  nextPage,
  postsLoading,
  noMorePosts,
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
        : <p>No posts found</p>
      }
      {
        postsLoading
        ? <NextPageDiv>
            <Loading transparent />
          </NextPageDiv>
        : noMorePosts
        ? null
        : <NextPageDiv>
            <button onClick={nextPage}>Load more</button>
          </NextPageDiv>
      }
    </StyledPostList>
  );
}

export default PostList;
