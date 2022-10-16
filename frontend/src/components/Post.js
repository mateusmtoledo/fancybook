import styled from "styled-components";
import Card from "../styles/Card";
import { ReactComponent as CommentIcon} from "../img/comment.svg";
import UserDisplayInfo from "./UserDisplayInfo";
import useLikes from "../hooks/useLikes";
import useComments from "../hooks/useComments";
import CommentList from "./CommentList";
import { useState } from "react";
import InteractionButton from "../styles/InteractionButton";

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
    likeCounter,
    likeButton,
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
        {likeCounter}
        <CommentCounter onClick={() => setCommentsVisible((prev) => !prev)}>
          {commentCount} Comments
        </CommentCounter>
      </PostStats>
      <div className="buttons">
        {likeButton}
        <InteractionButton
          onClick={() => setCommentsVisible((prev) => !prev)}
          isActive={commentsVisible}
        >
          <CommentIcon />
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
