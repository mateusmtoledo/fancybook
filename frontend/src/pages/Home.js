import Main from "../styles/Main";
import PostList from "../components/Posts/PostList";
import usePosts from "../hooks/usePosts";
import Nav from "src/components/Nav";
import { Container } from "src/styles/Home";

function Home() {
  const {
    posts,
    setPosts,
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
          setPosts={setPosts}
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
