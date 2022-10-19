import styled from "styled-components";
import Card from "../../styles/Card";
import UserDisplayInfo from "../UserDisplayInfo";
import useLikes from "../../hooks/useLikes";
import useComments from "../../hooks/useComments";

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
  const {
    likeCounter,
    likeButton,
  } = useLikes(post._id);

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
        {likeCounter}
        {commentCounter}
      </PostStats>
      <ButtonsContainer>
        {likeButton}
        {commentButton}
      </ButtonsContainer>
      {commentList}
    </StyledPost>
  );
}

export default Post;
