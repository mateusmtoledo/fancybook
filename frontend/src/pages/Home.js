import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../adapters/api";
import Header from "../components/Header";
import Post from "../components/Post";
import Main from "../styles/Main";

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await api.get('/posts');
        setPosts(response.data.posts);
      } catch(err) {
        // TODO implement error handling
        console.log(err);
      }
    }
    getPosts();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <PostList>
          {
            posts.length
            ? posts.map((post) => (
              <Post key={post._id} post={post} />
            ))
            : <p>No posts found</p>
          }
        </PostList>
      </Main>
    </>
  );
}

export default Home;
