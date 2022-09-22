import { useEffect } from "react";
import { useState } from "react";
import api from "../adapters/api";

function useLikes(postId) {
  const [pageNumber, setPageNumber] = useState(1);
  const [likes, setLikes] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likesLoading, setLikesLoading] = useState(false);

  const uri = `/posts/${postId}/likes`;

  function loadNextLikePage() {
    setPageNumber((previous) => previous + 1);
  }

  function refreshLikes() {
    setLikesLoading(true);
    api.get(uri, { params: { page: 1 } }).then((response) => {
      const { data } = response;
      setLikes(data.likes);
      setHasNextPage(data.hasNextPage);
      setLikeCount(data.count);
      setUserHasLiked(data.userHasLiked);
      setPageNumber(1);
      setLikesLoading(false);
    });
  }
  
  useEffect(() => {
    setLikesLoading(true);
    api.get(uri, { params: { page: pageNumber } }).then((response) => {
      const { data } = response;
      if (pageNumber === 1) setLikes(data.likes);
      else setLikes((previousLikes) => [...previousLikes, ...data.likes]);
      setHasNextPage(data.hasNextPage);
      setLikeCount(data.count);
      setLikesLoading(false);
      setUserHasLiked(data.userHasLiked);
    });
  }, [pageNumber, uri]);

  return {
    likes,
    hasNextPage,
    likeCount,
    userHasLiked,
    likesLoading,
    refreshLikes,
    loadNextLikePage,
  };
}

export default useLikes;
