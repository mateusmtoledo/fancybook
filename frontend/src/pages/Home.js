import Header from "../components/Header";
import Main from "../styles/Main";
import PostList from "../components/PostList";

function Home() {

  return (
    <>
      <Header />
      <Main>
        <PostList />
      </Main>
    </>
  );
}

export default Home;
