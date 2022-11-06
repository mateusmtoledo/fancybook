import Main from '../styles/Main';
import PostList from '../components/Posts/PostList';
import Nav from 'src/components/Nav';
import { Container } from 'src/styles/Home';

function Home() {
  return (
    <Container>
      <Nav />
      <Main maxWidth="700px">
        <PostList renderForm />
      </Main>
    </Container>
  );
}

export default Home;
