import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import getUniqueEntriesById from 'src/utils/getUniqueEntriesById';
import api from '../adapters/api';

function useComments(postId, initialCommentCount) {
  const [comments, setComments] = useState([]);
  const [commentPageNumber, setCommentPageNumber] = useState(0);
  const [hasNextCommentPage, setHasNextPage] = useState(false);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const uri = `/posts/${postId}/comments`;

  const loadNextCommentPage = useCallback(() => {
    setCommentPageNumber((previous) => previous + 1);
  }, []);

  useEffect(() => {
    if (commentPageNumber === 0) return;
    setCommentsLoading(true);
    api.get(uri, { params: { page: commentPageNumber } }).then((response) => {
      const { data } = response;
      // TODO implement better solution for pagination
      setComments((previousComments) =>
        getUniqueEntriesById([...previousComments, ...data.comments]),
      );
      setHasNextPage(data.hasNextPage);
      setCommentCount(data.count);
      setCommentsLoading(false);
    });
  }, [commentPageNumber, uri]);

  return {
    comments,
    setComments,
    loadNextCommentPage,
    commentPageNumber,
    hasNextCommentPage,
    commentCount,
    commentsLoading,
  };
}

export default useComments;
