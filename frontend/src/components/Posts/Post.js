import styled from "styled-components";
import Card from "../../styles/Card";
import UserDisplayInfo from "../UserDisplayInfo";
import useLikes from "../../hooks/useLikes";
import useComments from "../../hooks/useComments";
import { useState } from "react";
import LikeList from "../Likes/LikeList";
import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";
import CommentCounter from "../Comments/CommentCounter";
import CommentButton from "../Comments/CommentButton";
import CommentList from "../Comments/CommentList";

const StyledPost = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  word-break: break-word;

  hr {
    border: none;
    border-top: 1px solid var(--color-gray-dark);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;

  @media (max-width: 400px) {
    gap: 0;
    justify-content: space-between;
  }
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Post({ post }) {
  const [likeListVisible, setLikeListVisible] = useState(false);
  const {
    likes,
    setLikes,
    likeCount,
    setLikeCount,
    likePageNumber,
    hasNextLikePage,
    loadNextLikePage,
    userHasLiked,
    setUserHasLiked,
    likesLoading,
  } = useLikes(post._id, post.likeCount, post.userHasLiked);

  const [commentListVisible, setCommentListVisible] = useState(false);
  const {
    comments,
    setComments,
    commentPageNumber,
    loadNextCommentPage,
    hasNextCommentPage,
    commentCount,
  } = useComments(post._id, post.commentCount);

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
          likeCount={likeCount}
          setLikeListVisible={setLikeListVisible}
        />
        <CommentCounter
          commentCount={commentCount}
          setCommentListVisible={setCommentListVisible}
        />
      </PostStats>
      <ButtonsContainer>
        <LikeButton
          setLikes={setLikes}
          setLikeCount={setLikeCount}
          userHasLiked={userHasLiked}
          setUserHasLiked={setUserHasLiked}
          postId={post._id}
        />
        <CommentButton
          commentListVisible={commentListVisible}
          setCommentListVisible={setCommentListVisible}
        />
      </ButtonsContainer>
      <LikeList
        likes={likes}
        likeListVisible={likeListVisible}
        setLikeListVisible={setLikeListVisible}
        likePageNumber={likePageNumber}
        hasNextLikePage={hasNextLikePage}
        loadNextLikePage={loadNextLikePage}
        loading={likesLoading}
      />
      <CommentList
        postId={post._id}
        comments={comments}
        commentPageNumber={commentPageNumber}
        setComments={setComments}
        hasNextCommentPage={hasNextCommentPage}
        loadNextCommentPage={loadNextCommentPage}
        commentListVisible={commentListVisible}
      />
    </StyledPost>
  );
}

export default Post;
