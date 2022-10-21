import styled from "styled-components";
import Card from "../../styles/Card";
import UserDisplayInfo from "../UserDisplayInfo";
import useLikes from "../../hooks/useLikes";
import useComments from "../../hooks/useComments";
import { useState } from "react";
import LikeList from "../Likes/LikeList";
import LikeButton from "../Likes/LikeButton";
import LikeCounter from "../Likes/LikeCounter";

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
    hasNextLikePage,
    loadNextLikePage,
    userHasLiked,
    setUserHasLiked,
    likesLoading,
  } = useLikes(post._id, post.likeCount, post.userHasLiked);

  const {
    commentCounter,
    commentButton,
    commentList,
  } = useComments(post._id);

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
        {commentCounter}
      </PostStats>
      <ButtonsContainer>
        <LikeButton
          setLikes={setLikes}
          setLikeCount={setLikeCount}
          userHasLiked={userHasLiked}
          setUserHasLiked={setUserHasLiked}
          postId={post._id}
        />
        {commentButton}
      </ButtonsContainer>
      {commentList}
      { likeListVisible
        && <LikeList
          likes={likes}
          setLikeListVisible={setLikeListVisible}
          loadNextLikePage={loadNextLikePage}
          hasNextLikePage={hasNextLikePage}
          loading={likesLoading}/>}
    </StyledPost>
  );
}

export default Post;
