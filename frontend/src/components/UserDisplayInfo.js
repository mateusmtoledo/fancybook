import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";

const dateOptions = {
  minute: '2-digit',
  hour: '2-digit',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
}

const AuthorName = styled.p`
  font-size: 1rem;
  font-weight: 700;
  font-weight: ${(props) => props.bold ? '700': '300'};
`;

const PostDate = styled.p`
  font-size: 0.75rem;
  color: var(--color-gray-light);
`;

const StyledUserDisplayInfo = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  max-width: max-content;
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
`;

function UserDisplayInfo({ user, avatarSize, postDate, bold }) {
  return (
    <div>
      <StyledUserDisplayInfo to={`/user/${user._id}`}>
        <Avatar
          user={user}
          size={avatarSize}
        />
        <div>
          <AuthorName bold={bold}>{user.fullName}</AuthorName>
          {postDate
            && <PostDate className="post-date">{new Date(postDate).toLocaleString('en-US', dateOptions)}</PostDate>}
        </div>
      </StyledUserDisplayInfo>
    </div>
  );
}

export default UserDisplayInfo;