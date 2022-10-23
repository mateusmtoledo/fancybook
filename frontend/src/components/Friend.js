import { Link } from "react-router-dom";
import { FriendAvatar, FriendContainer } from "src/styles/Friend";

function Friend({ friend }) {
  return (
    <Link to={`/user/${friend._id}`}>
      <FriendContainer>
        <FriendAvatar
          user={friend}
        />
        <p>{friend.fullName}</p>
      </FriendContainer>
    </Link>
  );
}

export default Friend;
