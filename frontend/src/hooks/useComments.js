import { useCallback } from "react";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import api from "../adapters/api";
import CommentButton from "../components/Comments/CommentButton";
import CommentCounter from "../components/Comments/CommentCounter";
import CommentList from "../components/Comments/CommentList";

function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const uri = `/posts/${postId}/comments`;

  function loadNextCommentPage() {
    setPageNumber((previous) => previous + 1);
  }

  const refreshComments = useCallback(() => {
    api.get(uri, { params: { page: 1 } }).then((response) => {
      const { data } = response;
      setComments(data.comments);
      setHasNextPage(data.hasNextPage);
      setCommentCount(data.count);
      setPageNumber(1);
    });
  }, [uri]);
  
  useEffect(() => {
    api.get(uri, { params: { page: pageNumber } }).then((response) => {
      const { data } = response;
      if (pageNumber === 1) setComments(data.comments);
      else setComments((previousComments) => [...previousComments, ...data.comments]);
      setHasNextPage(data.hasNextPage);
      setCommentCount(data.count);
    });
  }, [pageNumber, uri]);

  const commentCounter = useMemo(() =>
    <CommentCounter
      commentCount={commentCount}
      setCommentsVisible={setCommentsVisible}
    />
  , [commentCount]);

  const commentList = useMemo(() =>
    <CommentList
      commentsVisible={commentsVisible}
      comments={comments}
      postId={postId}
      hasNextPage={hasNextPage}
      refreshComments={refreshComments}
      loadNextCommentPage={loadNextCommentPage}
    />
  , [commentsVisible, comments, postId, hasNextPage, refreshComments]);

  const commentButton = useMemo(() =>
    <CommentButton
      commentsVisible={commentsVisible}
      setCommentsVisible={setCommentsVisible}
    />
  , [commentsVisible]);

  return {
    commentCounter,
    commentList,
    commentButton,
  }
}
  
export default useComments;

  