import Header from "../components/Header";
import Main from "../styles/Main";
import PostList from "../components/PostList";
import FriendRequestList from "../components/FriendRequestList";
import styled from "styled-components";

const Aside = styled.aside`
  position: sticky;
  top: 16px;
  flex: 1 1 256px;
  height: max-content;
  
  @media (max-width: 650px) {
    display: none;
  }
`;

function Home({ friends }) {
  return (
    <>
      <Header />
      <Main>
        <PostList />
        <Aside>
          <FriendRequestList friendRequests={friends.pending || []} />
        </Aside>
      </Main>
    </>
  );
}

export default Home;
