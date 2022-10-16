import { useEffect } from "react";
import { useState } from "react";
import api from "../adapters/api";
import LikeCounter from "../components/LikeCounter";
import LikeButton from "../components/LikeButton";
import { useMemo } from "react";
import { useCallback } from "react";

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

  const refreshLikes = useCallback(() => {
    console.log('ran');
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
  }, [uri]);

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

  const likeButton = useMemo(() =>
    <LikeButton
      userHasLiked={userHasLiked}
      postId={postId}
      refreshLikes={refreshLikes}
    />
  , [userHasLiked, postId, refreshLikes]);

  const likeCounter = useMemo(() =>
    <LikeCounter
      likes={likes}
      count={likeCount}
      loadNextLikePage={loadNextLikePage}
      hasNextPage={hasNextPage}
      likesLoading={likesLoading}
    />
  , [hasNextPage, likeCount, likes, likesLoading]);

  return {
    likeButton,
    likeCounter,
  };
}

export default useLikes;
