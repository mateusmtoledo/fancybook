import { useEffect } from "react";
import { useState } from "react";
import api from "../adapters/api";

function usePosts(pageNumber, userId) {
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  
  useEffect(() => {
    setPostsLoading(true);
    const uri = userId ? `/users/${userId}/posts` : '/posts';
    api.get(uri, { params: { page: pageNumber } }).then((response) => {
      const { data } = response;
      if (pageNumber === 1) setPosts(data.posts);
      else setPosts((previousPosts) => [...previousPosts, ...data.posts]);
      setHasNextPage(data.hasNextPage);
      setPostsLoading(false);
    });
  }, [pageNumber, userId]);

  return { posts, hasNextPage, postsLoading };
}

export default usePosts;
