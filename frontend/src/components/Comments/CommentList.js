import { useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const LoadMoreCommentsButton = styled.button`
  color: var(--color-orange);
  width: max-content;
  align-self: center;
`;

function CommentList({
  postId,
  comments,
  commentPageNumber,
  setComments,
  hasNextCommentPage,
  loadNextCommentPage,
  commentListVisible,
}) {
  useEffect(() => {
    if (commentListVisible && commentPageNumber === 0) {
      loadNextCommentPage();
    }
  }, [commentListVisible, commentPageNumber, loadNextCommentPage]);

  if(!commentListVisible) return null;

  return (
    <CommentListContainer>
      <CommentForm postId={postId} setComments={setComments} />
      {
        comments.map((comment) => 
          <Comment key={comment._id} comment={comment} />
        )
      }
      {
        hasNextCommentPage &&
        <LoadMoreCommentsButton onClick={loadNextCommentPage}>
          Load more
        </LoadMoreCommentsButton>
      }
    </CommentListContainer>
  );
}

export default CommentList;
