import InteractionButton from "../../styles/InteractionButton";
import { ReactComponent as CommentIcon } from "../../img/comment.svg";

function CommentButton({ commentListVisible, setCommentListVisible }) {
  return (
    <InteractionButton
      onClick={() => setCommentListVisible((prev) => !prev)}
      isActive={commentListVisible}
    >
      <CommentIcon />
      <p>Comment</p>
    </InteractionButton>
  );
}

export default CommentButton;
