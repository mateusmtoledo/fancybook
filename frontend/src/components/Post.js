import styled from "styled-components";
import Card from "../styles/Card";
import { ReactComponent as  LikeIcon } from "../img/thumbs-up.svg";
import COMMENT_ICON from "../img/comment.svg";
import api from "../adapters/api";
import LikeCounter from "./LikeCounter";
import UserDisplayInfo from "./UserDisplayInfo";
import useLikes from "../hooks/useLikes";
import useComments from "../hooks/useComments";
import CommentList from "./CommentList";
import { useState } from "react";

const InteractionButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;
  gap: 8px;
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
  const {
    likes,
    hasNextPage,
    likeCount,
    userHasLiked,
    likesLoading,
    loadNextLikePage,
    refreshLikes,
  } = useLikes(post._id);

  const {
    comments,
    pageNumber,
    hasNextPage: hasNextCommentPage,
    commentCount,
    commentsLoading,
    loadNextCommentPage,
    refreshComments,
  } = useComments(post._id);

  const [commentsVisible, setCommentsVisible] = useState(false);

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
          loadNextLikePage={loadNextLikePage}
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
            refreshLikes();
          }}
          userHasLiked={userHasLiked}
        >
          <LikeIcon />
          <p>{userHasLiked ? 'Liked' : 'Like'}</p>
        </LikeButton>
        <InteractionButton onClick={() => setCommentsVisible((prev) => !prev)}>
          <img
            alt="Comment on this post"
            src={COMMENT_ICON}
            width="24px"
            height="24px"
          />
          <p>Comment</p>
        </InteractionButton>
      </div>
      {commentsVisible && comments
        && <CommentList
          comments={comments}
          postId={post._id}
          hasNextPage={hasNextCommentPage}
          pageNumber={pageNumber}
          commentCount={commentCount}
          commentsLoading={commentsLoading}
          refreshComments={refreshComments}
          loadNextCommentPage={loadNextCommentPage}
        />}
    </StyledPost>
  );
}

export default Post;
