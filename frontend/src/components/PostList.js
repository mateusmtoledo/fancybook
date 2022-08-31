import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../adapters/api";
import Loading from "./Loading";
import Post from "./Post";
import PostForm from "./PostForm";

async function getPosts(page) {
  page = page || 0;
  const response = await api.get(`/posts?page=${page}`);
  return response.data.posts;
}

const NextPageDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 48px;
  button {
    font-size: 1rem;
    padding: 8px 32px;
    font-family: 'Roboto', sans-serif;
    background-color: var(--color-brown-dark);
    color: var(--color-white);
    border: none;
    box-shadow: var(--shadow-card);
    border-radius: 8px;
    cursor: pointer;
  }
`

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 0 3 700px;
`;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const [loading, setLoading] = useState(false);

  async function refreshPosts() {
    setPosts([]);
    setLoading(true);
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
    setLoading(false);
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  async function nextPage() {
    try {
      setLoading(true);
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
    setLoading(false);
  }

  return (
    <StyledPostList>
      <PostForm refreshPosts={refreshPosts} />
      {
        posts.length
        ? posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
        : loading
        ? null
        : <p>No posts found</p>
      }
      {
        loading
        ? <NextPageDiv>
            <Loading transparent />
          </NextPageDiv>
        : noMorePosts
        ? null
        : <NextPageDiv>
            <button onClick={nextPage}>Load more</button>
          </NextPageDiv>
      }
    </StyledPostList>
  );
}

export default PostList;
