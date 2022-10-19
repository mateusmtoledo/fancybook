import Main from "../styles/Main";
import PostList from "../components/Posts/PostList";
import usePosts from "../hooks/usePosts";
import Nav from "src/components/Nav";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

function Home() {
  const {
    posts,
    hasNextPage,
    postsLoading,
    refreshPosts,
    loadNextPostPage,
  } = usePosts();

  return (
    <Container>
      <Nav />
      <Main maxWidth="700px">
        <PostList
          posts={posts}
          postsLoading={postsLoading}
          hasNextPage={hasNextPage}
          loadNextPostPage={loadNextPostPage}
          refreshPosts={refreshPosts}
          renderForm
        />
      </Main>
    </Container>
  );
}

export default Home;
