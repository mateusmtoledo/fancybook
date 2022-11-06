import { CommentCounterContainer } from 'src/styles/CommentCounter';

function CommentCounter({ commentCount, setCommentListVisible }) {
  return (
    <CommentCounterContainer
      onClick={() => setCommentListVisible((prev) => !prev)}
    >
      {commentCount} Comments
    </CommentCounterContainer>
  );
}

export default CommentCounter;
