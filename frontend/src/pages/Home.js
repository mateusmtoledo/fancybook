import Header from "../components/Header";
import Main from "../styles/Main";
import PostList from "../components/PostList";
import FriendRequestList from "../components/FriendRequestList";
import styled from "styled-components";

const Aside = styled.aside`
  flex: 1 1 256px;
`;

function Home() {

  return (
    <>
      <Header />
      <Main>
        <PostList />
        <Aside>
          <FriendRequestList />
        </Aside>
      </Main>
    </>
  );
}

export default Home;
