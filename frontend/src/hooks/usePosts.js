import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import getUniqueEntriesById from "src/utils/getUniqueEntriesById";
import api from "../adapters/api";

function usePosts(userId) {
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [postsLoading, setPostsLoading] = useState(true);

  const uri = userId ? `/users/${userId}/posts` : '/posts';

  const loadNextPostPage = useCallback(() => {
    setPageNumber((previous) => previous + 1);
  }, [])
  
  useEffect(() => {
    setPostsLoading(true);
    const controller = new AbortController();
    const { signal } = controller;
    api.get(uri, { params: { page: pageNumber },  signal })
      .then((response) => {
        const { data } = response;
        if (pageNumber === 1) setPosts(data.posts);
        // TODO implement better solution for pagination
        setPosts((previousPosts) =>
          getUniqueEntriesById([...previousPosts, ...data.posts])
        );
        setHasNextPage(data.hasNextPage);
        setPostsLoading(false);
      })
      .catch((err) => {
        if (signal.aborted) return;
      });
    return () => controller.abort();
  }, [pageNumber, uri]);

  return {
    posts,
    setPosts,
    hasNextPage,
    postsLoading,
    loadNextPostPage,
  };
}

export default usePosts;
