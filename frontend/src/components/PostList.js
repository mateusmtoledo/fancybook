import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import api from "../adapters/api";
import Post from "./Post";
import PostForm from "./PostForm";

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function PostList() {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async function() {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts);
    } catch(err) {
      // TODO implement error handling
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <StyledPostList>
      <PostForm getPosts={getPosts} />
      {
        posts.length
        ? posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
        : <p>No posts found</p>
      }
    </StyledPostList>
  );
}

export default PostList;
