import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";

const FriendAvatar = styled(Avatar)`
  border-radius: 8px;
  width: 100%;
  height: min-content;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const StyledFriend = styled.div`
  p {
    font-size: 0.9rem;
    font-weight: 500;
    text-overflow: ellipsis;
    height: 1.2em;
    overflow: hidden;
    white-space: nowrap;
  }
`;

function Friend({ friend }) {
  return (
    <Link to={`/user/${friend._id}`}>
      <StyledFriend>
        <FriendAvatar
          user={friend}
        />
        <p>{friend.fullName}</p>
      </StyledFriend>
    </Link>
  );
}

export default Friend;
