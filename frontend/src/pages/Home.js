import api from "../adapters/api";
import Header from "../components/Header";
import Main from "../styles/Main";
import PostList from "../components/PostList";
import FriendRequestList from "../components/FriendRequestList";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

const Aside = styled.aside`
  position: sticky;
  top: 16px;
  flex: 1 1 256px;
  height: max-content;
  
  @media (max-width: 650px) {
    display: none;
  }
`;

async function getPosts(page) {
  page = page || 0;
  const response = await api.get(`/posts?page=${page}`);
  return response.data.posts;
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const [page, setPage] = useState(0);

  async function refreshPosts() {
    setPostsLoading(true);
    setPosts([]);
    try {
      const returnedPosts = await getPosts(0);
      setPosts(returnedPosts);
      setPage(0);
      if(returnedPosts.length < 8) {
        setNoMorePosts(true);
      } else {
        setNoMorePosts(false);
      }
    } catch (err) {
      // TODO implement error handling
      console.log(err);
    }
    setPostsLoading(false);
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  async function nextPage() {
    try {
      setPostsLoading(true);
      const newPosts = await getPosts(page + 1);
      setPosts([...posts, ...newPosts]);
      setPage(page + 1);
      if(newPosts.length < 8) {
        setNoMorePosts(true);
      }
    } catch (err) {
      // TODO implement error handling
      console.log(err);
    }
    setPostsLoading(false);
  }

  return (
    <>
      <Header />
      <Main>
        <PostList
          posts={posts}
          refreshPosts={refreshPosts}
          page={page}
          nextPage={nextPage}
          postsLoading={postsLoading}
          noMorePosts={noMorePosts}
        />
        <Aside>
          <FriendRequestList
            refreshPosts={refreshPosts}
          />
        </Aside>
      </Main>
    </>
  );
}

export default Home;
