import InteractionButton from "../../styles/InteractionButton";
import { ReactComponent as LikeIcon } from "../../img/thumbs-up.svg";
import api from "../../adapters/api";
import { useContext, useState } from "react";
import { UserContext } from "src/contexts/UserContext";
import { ToastContext } from "src/contexts/ToastContext";
import styled from "styled-components";

const LikeIconStyled = styled(LikeIcon)`
  &[data-beenclicked="true"][data-liked="true"] {
    animation: liked 0.5s 1;
  }

  @keyframes liked {
    0% {
      transform: none;
    }
    33% {
      transform: rotate(-15deg) scale(1.3);
    }
    67% {
      transform: rotate(-15deg) scale(1.3);
    }
    100% {
      transform: none;
    }
  }
`;

function LikeButton({
  postId,
  userHasLiked,
  setUserHasLiked,
  setLikes,
  setLikeCount,
  likePageNumber,
  likesLoading,
}) {
  const { user } = useContext(UserContext);
  const { sendNotification } = useContext(ToastContext);
  const [beenClicked, setbeenClicked] = useState(false);

  async function handleClick() {
    if (!beenClicked) setbeenClicked(true);
    try {
      if (userHasLiked) {
        setLikeCount((prev) => prev - 1);
        setLikes((prev) => prev.filter((like) => like.author._id !== user._id));
        setUserHasLiked(false);
        await api.delete(`/posts/${postId}/likes`);
      } else {
        const like = {
          author: user,
          date: Date.now(),
        };
        setLikeCount((prev) => prev + 1);
        if (likePageNumber > 1 || (likePageNumber === 1 && !likesLoading))
          setLikes((prev) =>
            prev.some((like) => like.author._id === user._id)
              ? prev
              : [like, ...prev]
          );
        setUserHasLiked(true);
        await api.post(`/posts/${postId}/likes`);
      }
    } catch (err) {
      console.log(err);
      sendNotification({
        type: "error",
        text: "Something went wrong",
      });
    }
  }

  return (
    <InteractionButton
      onClick={handleClick}
      isActive={userHasLiked}
      data-active={userHasLiked}
    >
      <LikeIconStyled
        data-beenclicked={beenClicked}
        data-liked={userHasLiked}
      />
      <p>Like</p>
    </InteractionButton>
  );
}

export default LikeButton;
