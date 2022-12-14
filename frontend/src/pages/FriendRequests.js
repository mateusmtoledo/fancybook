import FriendRequestList from 'src/components/FriendRequests/FriendRequestList';
import Nav from 'src/components/Nav';
import { Container } from 'src/styles/Home';
import Main from 'src/styles/Main';

function FriendRequests() {
  return (
    <Container>
      <Nav />
      <Main maxWidth="840px">
        <FriendRequestList />
      </Main>
    </Container>
  );
}

export default FriendRequests;
