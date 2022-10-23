import Friend from "./Friend";
import X_CIRCLE_ICON from "../img/x-circle.svg";
import { NoFriends, FriendListContainer, Friends } from "src/styles/FriendList";
import FriendSkeleton from "./Skeletons/FriendSkeleton";

function FriendList({ friends, friendsLoading }) {
  if (friends.length === 0 && !friendsLoading) {
    return (
      <FriendListContainer>
        <h3>Friends</h3>
        <NoFriends>
          <img
            src={X_CIRCLE_ICON}
            alt="No friends found"
          />
          <p>No friends found</p>
        </NoFriends>
      </FriendListContainer>
    );
  }
  
  return (
    <FriendListContainer>
      <h3>Friends</h3>
      <Friends>
        {
          friends.map((friend) =>
            <Friend friend={friend} key={friend._id} />
          )
        }
        { friendsLoading &&
          new Array(9).fill().map((_, i) => (
            <FriendSkeleton key={i} />
          ))
        }
      </Friends>
    </FriendListContainer>
  );
}

export default FriendList;
