import { useEffect } from "react";
import { useState } from "react";
import api from "../adapters/api";

function useLikes(pageNumber, postId) {
  const [likes, setLikes] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likesLoading, setLikesLoading] = useState(false);
  
  useEffect(() => {
    setLikesLoading(true);
    const uri = `/posts/${postId}/likes`;
    api.get(uri, { params: { page: pageNumber } }).then((response) => {
      const { data } = response;
      if (pageNumber === 1) setLikes(data.likes);
      else setLikes((previousLikes) => [...previousLikes, ...data.likes]);
      setHasNextPage(data.hasNextPage);
      setLikeCount(data.count);
      setLikesLoading(false);
      setUserHasLiked(data.userHasLiked);
    });
  }, [pageNumber, postId]);

  return { likes, hasNextPage, likeCount, userHasLiked, likesLoading };
}

export default useLikes;
