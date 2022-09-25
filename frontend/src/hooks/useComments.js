import { useEffect, useState } from "react";
import api from "../adapters/api";

function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const uri = `/posts/${postId}/comments`;

  function loadNextCommentPage() {
    setPageNumber((previous) => previous + 1);
  }

  function refreshComments() {
    setCommentsLoading(true);
    api.get(uri, { params: { page: 1 } }).then((response) => {
      const { data } = response;
      setComments(data.comments);
      setHasNextPage(data.hasNextPage);
      setCommentCount(data.count);
      setPageNumber(1);
      setCommentsLoading(false);
    });
  }
  
  useEffect(() => {
    setCommentsLoading(true);
    api.get(uri, { params: { page: pageNumber } }).then((response) => {
      const { data } = response;
      if (pageNumber === 1) setComments(data.comments);
      else setComments((previousComments) => [...previousComments, ...data.comments]);
      setHasNextPage(data.hasNextPage);
      setCommentCount(data.count);
      setCommentsLoading(false);
      console.log(data);
    });
  }, [pageNumber, uri]);

  return {
    comments,
    pageNumber,
    hasNextPage,
    commentCount,
    commentsLoading,
    loadNextCommentPage,
    refreshComments,
  }
}
  
export default useComments;

  