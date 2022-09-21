import styled from "styled-components";
import Card from "../styles/Card";
import { ReactComponent as  LikeIcon } from "../img/thumbs-up.svg";
import COMMENT_ICON from "../img/comment.svg";
import { useState } from "react";
import api from "../adapters/api";
import LikeCounter from "./LikeCounter";
import UserDisplayInfo from "./UserDisplayInfo";
import useLikes from "../hooks/useLikes";

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

function Post({ post }) {
  const [likePageNumber, setLikePageNumber] = useState(1);
  const {
    likes,
    hasNextPage,
    likeCount,
    userHasLiked,
    likesLoading,
  } = useLikes(likePageNumber, post._id);

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
        <LikeCounter
          likes={likes}
          count={likeCount}
          goToNextPage={
            () => setLikePageNumber((previousPage) => previousPage + 1)
          }
          hasNextPage={hasNextPage}
          likesLoading={likesLoading}
        />
      </div>
      <div className="buttons">
        <LikeButton
          onClick={async () => {
            if (userHasLiked) {
              await api.delete(`/posts/${post._id}/likes`);
            } else {
              await api.post(`/posts/${post._id}/likes`);
            }
            setLikePageNumber(1);
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
