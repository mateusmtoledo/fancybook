import InteractionButton from "../../styles/InteractionButton";
import { ReactComponent as LikeIcon } from "../../img/thumbs-up.svg";
import api from "../../adapters/api";
import { useContext } from "react";
import { UserContext } from "src/contexts/UserContext";
import { ToastContext } from "src/contexts/ToastContext";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

function LikeButton({
  postId,
  userHasLiked,
  setUserHasLiked,
  setLikes,
  setLikeCount,
}) {
  const { user } = useContext(UserContext);
  const { sendNotification } = useContext(ToastContext);
  const [likeButtonLoading, setLikeButtonLoading] = useState(false);

  async function handleClick() {
    setLikeButtonLoading(true);
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
        type: "error",
        text: "Something went wrong",
      });
    }
    setLikeButtonLoading(false);
  }

  if (likeButtonLoading)
    return (
      <InteractionButton data-testid="like-button-skeleton">
        <Skeleton circle width={22} height={22} />
        <Skeleton width={37} />
      </InteractionButton>
    );

  return (
    <InteractionButton onClick={handleClick} isActive={userHasLiked}>
      <LikeIcon />
      <p>Like</p>
    </InteractionButton>
  );
}

export default LikeButton;
