import { useCallback } from "react";
import { useEffect, useState } from "react";
import api from "../adapters/api";

function useComments(postId, initialCommentCount) {
  const [comments, setComments] = useState([]);
  const [commentPageNumber, setCommentPageNumber] = useState(0);
  const [hasNextCommentPage, setHasNextPage] = useState(false);
  const [commentCount, setCommentCount] = useState(initialCommentCount);

  const uri = `/posts/${postId}/comments`;

  const loadNextCommentPage = useCallback(() => {
    setCommentPageNumber((previous) => previous + 1);
  }, []);
  
  useEffect(() => {
    if (commentPageNumber === 0) return;
    api.get(uri, { params: { page: commentPageNumber } }).then((response) => {
      const { data } = response;
      setComments((previousComments) => [...previousComments, ...data.comments]);
      setHasNextPage(data.hasNextPage);
      setCommentCount(data.count);
    });
  }, [commentPageNumber, uri]);

  return {
    comments,
    setComments,
    loadNextCommentPage,
    commentPageNumber,
    hasNextCommentPage,
    commentCount,
  }
}
  
export default useComments;

  