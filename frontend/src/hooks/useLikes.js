import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import getUniqueEntriesById from 'src/utils/getUniqueEntriesById';
import api from '../adapters/api';

function useLikes(postId, initialLikeCount, initialUserHasLiked) {
  const [likes, setLikes] = useState([]);
  const [likePageNumber, setLikePageNumber] = useState(0);
  const [hasNextLikePage, setHasNextLikePage] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [userHasLiked, setUserHasLiked] = useState(initialUserHasLiked);
  const [likesLoading, setLikesLoading] = useState(false);

  const uri = `/posts/${postId}/likes`;

  const loadNextLikePage = useCallback(() => {
    setLikePageNumber((previous) => previous + 1);
  }, []);

  useEffect(() => {
    if (likePageNumber === 0) return;
    setLikesLoading(true);
    api.get(uri, { params: { page: likePageNumber } }).then((response) => {
      const { data } = response;
      // TODO implement better solution for pagination
      setLikes((previousLikes) =>
        getUniqueEntriesById([...previousLikes, ...data.likes]),
      );
      setHasNextLikePage(data.hasNextPage);
      setLikeCount(data.count);
      setUserHasLiked(data.userHasLiked);
      setLikesLoading(false);
    });
  }, [likePageNumber, uri]);

  return {
    likes,
    setLikes,
    likeCount,
    setLikeCount,
    likePageNumber,
    hasNextLikePage,
    loadNextLikePage,
    userHasLiked,
    setUserHasLiked,
    likesLoading,
  };
}

export default useLikes;
