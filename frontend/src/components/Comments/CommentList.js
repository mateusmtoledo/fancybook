import { useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import EXPAND_ICON from "../../img/expand-down.svg";
import Loading from "../Loading";

const CommentListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const LoadMoreCommentsButton = styled.button`
  display: flex;
  gap: 4px;
  color: var(--color-white);
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 0.8rem;
  font-weight: 700;

  // adjust sizing and positioning so that hover box-shadow takes whole width
  width: calc(100% + 32px);
  height: calc(1.6em + 32px);
  position: relative;
  margin: 0 0 -32px;
  right: 16px;
  bottom: 16px;
  border-radius: 8px;
  
  transition: box-shadow 0.3s;

  img {
    width: 20px;
    height: auto;
  }
  
  :hover {
    box-shadow: inset 0px -40px 40px -40px var(--color-orange);
  }
`;

function CommentList({
  postId,
  comments,
  commentPageNumber,
  setComments,
  hasNextCommentPage,
  loadNextCommentPage,
  commentListVisible,
  commentsLoading,
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
        commentsLoading && <Loading transparent positionStatic />
      }
      {
        hasNextCommentPage && !commentsLoading &&
        <LoadMoreCommentsButton onClick={loadNextCommentPage}>
          <p>Show more</p>
          <img
            alt="Show more comments"
            src={EXPAND_ICON}
          />
        </LoadMoreCommentsButton>
      }
    </CommentListContainer>
  );
}

export default CommentList;
