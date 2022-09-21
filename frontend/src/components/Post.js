import styled from "styled-components";
import Card from "../styles/Card";
import { ReactComponent as  LikeIcon } from "../img/thumbs-up.svg";
import COMMENT_ICON from "../img/comment.svg";
import { useCallback, useEffect, useState } from "react";
import api from "../adapters/api";
import LikeCounter from "./LikeCounter";
import UserDisplayInfo from "./UserDisplayInfo";

const InteractionButton = styled.button`
  background: none;
  border: none;
  display: flex;
  color: var(--color-white);
  align-items: center;
  font-size: 1rem;
  gap: 8px;
  cursor: pointer;
`;

const LikeButton = styled(InteractionButton)`
  color: ${(props) => props.userHasLiked ? 'var(--color-orange)' : 'var(--color-white)'};
  stroke: ${(props) => props.userHasLiked ? 'var(--color-orange)' : 'var(--color-white)'};
`;

const StyledPost = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  word-break: break-word;

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 80px;
  }
  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
`;

async function getLikes(postId, page) {
  const response = await api.get(`/posts/${postId}/likes?page=${page}`);
  return response.data;
}

function Post({ post }) {
  const [likes, setLikes] = useState(null);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likePage, setLikePage] = useState(0);

  const refreshLikes = useCallback(async () => {
    getLikes(post._id, likePage).then((data) => {
      setLikes(data.likes);
      setLikeCount(data.count);
      setUserHasLiked(data.userHasLiked);
    });
  }, [post._id, likePage]);

  useEffect(() => {
    refreshLikes();
  }, [refreshLikes]);

  return (
    <StyledPost>
      <UserDisplayInfo
        user={post.author}
        postDate={post.date}
        bold
      />
      <p>
        {post.text}
      </p>
      <hr />
      <div className="stats">
        {likes && <LikeCounter likes={likes} count={likeCount} />}
      </div>
      <div className="buttons">
        <LikeButton
          onClick={async () => {
            if (userHasLiked) {
              await api.delete(`/posts/${post._id}/likes`);
            } else {
              await api.post(`/posts/${post._id}/likes`);
            }
            await refreshLikes();
          }}
          userHasLiked={userHasLiked}
        >
          <LikeIcon />
          <p>{userHasLiked ? 'Liked' : 'Like'}</p>
        </LikeButton>
        <InteractionButton>
          <img
            alt="Comment on this post"
            src={COMMENT_ICON}
            width="24px"
            height="24px"
          />
          <p>Comment</p>
        </InteractionButton>
      </div>
    </StyledPost>
  );
}

export default Post;
