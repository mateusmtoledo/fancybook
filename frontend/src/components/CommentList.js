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
  pageNumber,
  hasNextPage,
  commentCount,
  commentsLoading,
  loadNextCommentPage,
  refreshComments,
}) {
  return (
    <CommentListContainer>
      <CommentForm postId={postId} refreshComments={refreshComments} />
      {
        comments.map((comment) => 
          <Comment key={comment._id} comment={comment} />
        )
      }
      {hasNextPage &&
        <LoadMoreCommentsButton onClick={loadNextCommentPage}>
          Load more
        </LoadMoreCommentsButton>}
    </CommentListContainer>
  );
}

export default CommentList;
