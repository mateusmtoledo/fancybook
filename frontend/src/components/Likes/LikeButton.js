import InteractionButton from "../../styles/InteractionButton";
import { ReactComponent as  LikeIcon } from "../../img/thumbs-up.svg";
import api from "../../adapters/api";
import { useContext } from "react";
import { UserContext } from "src/contexts/UserContext";
import { ToastContext } from "src/contexts/ToastContext";

function LikeButton({ postId, userHasLiked, setUserHasLiked, setLikes, setLikeCount }) {
  const { user } = useContext(UserContext);
  const { sendNotification } = useContext(ToastContext);

  async function handleClick() {
    try {
      if (userHasLiked) {
        await api.delete(`/posts/${postId}/likes`);
        setLikeCount((prev) => prev - 1);
        setLikes((prev) => prev.filter((like) => like.author._id !== user._id));
        setUserHasLiked(false);
      } else {
        const response = await api.post(`/posts/${postId}/likes`);
        const { like } = response.data;
        setLikeCount((prev) => prev + 1);
        setLikes((prev) => [like, ...prev]);
        setUserHasLiked(true);
      }
    } catch (err) {
      console.log(err);
      sendNotification({
        type: 'error',
        text: 'Something went wrong',
      });
    }
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
