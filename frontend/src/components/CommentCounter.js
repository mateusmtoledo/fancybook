import styled from "styled-components";

const CommentCounterContainer = styled.button`
  font-size: 0.9rem;

  &:hover {
    color: var(--color-orange);
  }
`;

function CommentCounter({ commentCount, setCommentsVisible }) {
  function handleClick() {
    setCommentsVisible((prev) => !prev);
  }

  return (
    <CommentCounterContainer onClick={handleClick}>
      {commentCount} Comments
    </CommentCounterContainer>
  );
}

export default CommentCounter;
