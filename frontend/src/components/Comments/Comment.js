import styled from "styled-components";
import Avatar from "../Avatar";
import { getDateString } from "../../adapters/dateFormatter";
import { Link } from "react-router-dom";

const CommentContainer = styled.li`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 4px;
  max-width: 100%;
`;

const CommentAvatar = styled(Link)`
  grid-row: span 2;
  height: max-content;
`;

const CommentAuthorName = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 0 1 auto;
  max-width: max-content;
`;

const CommentText = styled.p`
  font-size: 0.9rem;
`;

const CommentDate = styled.p`
  font-size: 0.8rem;
  color: var(--color-gray-light);
  flex: 1 0 auto;
  max-width: max-content;
`;

const CommentInfo = styled.div`
  display: flex;
  gap: 8px;
  max-width: 100%;
  min-width: 0;

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 0;
  }
`;

function Comment({ comment }) {
  return (
    <CommentContainer>
      <CommentAvatar to={`/user/${comment.author._id}`}>
        <Avatar user={comment.author} size="28px" />
      </CommentAvatar>
      <CommentInfo>
        <CommentAuthorName>
          <Link to={`/user/${comment.author._id}`}>
            {comment.author.fullName}
          </Link>
        </CommentAuthorName>
        <CommentDate>{getDateString(comment.date)}</CommentDate>
      </CommentInfo>
      <CommentText>{comment.text}</CommentText>
    </CommentContainer>
  );
}

export default Comment;
