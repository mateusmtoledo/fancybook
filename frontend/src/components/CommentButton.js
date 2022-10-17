import InteractionButton from "../styles/InteractionButton";
import { ReactComponent as CommentIcon} from "../img/comment.svg";

function CommentButton({ commentsVisible, setCommentsVisible }) {
  return (
    <InteractionButton
      onClick={() => setCommentsVisible((prev) => !prev)}
      isActive={commentsVisible}
    >
      <CommentIcon />
      <p>Comment</p>
    </InteractionButton>
  );
}

export default CommentButton;
