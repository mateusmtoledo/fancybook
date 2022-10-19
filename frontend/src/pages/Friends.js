import FriendRequestList from "src/components/FriendRequestList";
import Nav from "src/components/Nav";
import { Container } from "src/styles/Home";
import Main from "src/styles/Main";

function Friends() {
  return (
    <Container>
      <Nav />
      <Main maxWidth="840px">
        <FriendRequestList />
      </Main>
    </Container>
  );
}

export default Friends;
