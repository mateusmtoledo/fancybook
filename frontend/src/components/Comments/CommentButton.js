import InteractionButton from "../../styles/InteractionButton";
import { ReactComponent as CommentIcon } from "../../img/comment.svg";

function CommentButton({ commentListVisible, focusCommentInput }) {
  return (
    <InteractionButton
      onClick={() => {
        focusCommentInput();
      }}
      isActive={commentListVisible}
    >
      <CommentIcon />
      <p>Comment</p>
    </InteractionButton>
  );
}

export default CommentButton;
