import InteractionButton from "../../styles/InteractionButton";
import { ReactComponent as  LikeIcon } from "../../img/thumbs-up.svg";
import api from "../../adapters/api";

function LikeButton({ refreshLikes, userHasLiked, postId }) {
  async function handleClick() {
    if (userHasLiked) {
      await api.delete(`/posts/${postId}/likes`);
    } else {
      await api.post(`/posts/${postId}/likes`);
    }
    refreshLikes();
  }

  return (
    <InteractionButton
      onClick={handleClick}
      isActive={userHasLiked}
    >
      <LikeIcon />
      <p>{userHasLiked ? 'Liked' : 'Like'}</p>
    </InteractionButton>
  );
}

export default LikeButton;
