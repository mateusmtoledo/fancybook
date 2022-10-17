import styled from "styled-components";
import Avatar from "../Avatar";
import { getDateString } from "../../adapters/dateFormatter";
import { Link } from "react-router-dom";

const CommentContainer = styled.li`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 4px;
`;

const CommentAvatar = styled(Link)`
  grid-row: span 2;
  height: max-content;
`;

const CommentAuthorName = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
`;

const CommentText = styled.p`
  font-size: 0.9rem;
`;

const CommentDate = styled.p`
  font-size: 0.8rem;
  color: var(--color-gray-light);
`

const CommentInfo = styled.div`
  display: flex;
  gap: 8px;
`;

function Comment({ comment }) {
  return (
    <CommentContainer>
      <CommentAvatar to={`/user/${comment.author._id}`}>
        <Avatar user={comment.author} size="36px" />
      </CommentAvatar>
      <CommentInfo>
        <Link to={`/user/${comment.author._id}`}>
          <CommentAuthorName>{comment.author.fullName}</CommentAuthorName>
        </Link>
        <CommentDate>{getDateString(comment.date)}</CommentDate>
      </CommentInfo>
      <CommentText>{comment.text}</CommentText>
    </CommentContainer>
  );
}

export default Comment;
