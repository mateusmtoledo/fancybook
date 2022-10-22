import { useCallback, useEffect } from "react";
import { useState } from "react";
import api from "../adapters/api";

function usePosts(userId) {
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [postsLoading, setPostsLoading] = useState(true);

  const uri = userId ? `/users/${userId}/posts` : '/posts';

  function loadNextPostPage() {
    setPageNumber((previous) => previous + 1);
  }

  const refreshPosts = useCallback(() => {
    setPostsLoading(true);
    api.get(uri, { params: { page: pageNumber } }).then((response) => {
      const { data } = response;
      setPosts(data.posts);
      setHasNextPage(data.hasNextPage);
      setPostsLoading(false);
    });
  }, [pageNumber, uri]);
  
  useEffect(() => {
    setPostsLoading(true);
    api.get(uri, { params: { page: pageNumber } }).then((response) => {
      const { data } = response;
      if(pageNumber === 1) setPosts(data.posts);
      else setPosts((previousPosts) => [...previousPosts, ...data.posts]);
      setHasNextPage(data.hasNextPage);
      setPostsLoading(false);
    });
  }, [pageNumber, uri]);

  return {
    posts,
    setPosts,
    hasNextPage,
    postsLoading,
    refreshPosts,
    loadNextPostPage,
  };
}

export default usePosts;
