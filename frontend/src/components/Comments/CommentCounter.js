import styled from "styled-components";

const CommentCounterContainer = styled.button`
  font-size: 0.9rem;

  &:hover {
    color: var(--color-orange);
  }
`;

function CommentCounter({ commentCount, setCommentListVisible }) {
  return (
    <CommentCounterContainer onClick={() => setCommentListVisible((prev) => !prev)}>
      {commentCount} Comments
    </CommentCounterContainer>
  );
}

export default CommentCounter;
