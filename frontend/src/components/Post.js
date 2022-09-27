import styled from "styled-components";
import Card from "../styles/Card";
import { ReactComponent as  LikeIcon } from "../img/thumbs-up.svg";
import { ReactComponent as CommentIcon} from "../img/comment.svg";
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

const CommentButton = styled(InteractionButton)`
  color: ${(props) => props.commentsVisible ? 'var(--color-orange)' : 'var(--color-white)'};
  stroke: ${(props) => props.commentsVisible ? 'var(--color-orange)' : 'var(--color-white)'};
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

const PostStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentCounter = styled.button`
  font-size: 0.9rem;

  &:hover {
    color: var(--color-orange);
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
      <PostStats>
        <LikeCounter
          likes={likes}
          count={likeCount}
          loadNextLikePage={loadNextLikePage}
          hasNextPage={hasNextPage}
          likesLoading={likesLoading}
        />
        <CommentCounter onClick={() => setCommentsVisible((prev) => !prev)}>
          {commentCount} Comments
        </CommentCounter>
      </PostStats>
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
        <CommentButton
          onClick={() => setCommentsVisible((prev) => !prev)}
          commentsVisible={commentsVisible}
        >
          <CommentIcon />
          <p>Comment</p>
        </CommentButton>
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
