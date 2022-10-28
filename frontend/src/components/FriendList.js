import Friend from "./Friend";
import X_CIRCLE_ICON from "../img/x-circle.svg";
import { NoFriends, FriendListContainer, Friends, NextPageButton } from "src/styles/FriendList";
import FriendSkeleton from "./Skeletons/FriendSkeleton";
import MORE_VERTICAL_ICON from "../img/more-vertical.svg";

function FriendList({
  friends,
  friendsLoading,
  friendCount,
  hasNextFriendsPage,
  loadNextFriendsPage
}) {
  if (friends.length === 0 && !friendsLoading) {
    return (
      <FriendListContainer>
        <h3>Friends ( {friendCount} )</h3>
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
      <h3>Friends ( {friendCount} )</h3>
      <Friends>
        {
          friends.map((friend) =>
            <Friend friend={friend} key={friend._id} />
          )
        }
        { friendsLoading &&
          new Array(6).fill().map((_, i) => (
            <FriendSkeleton key={i} />
          ))
        }
        { !friendsLoading && hasNextFriendsPage &&
          <NextPageButton
            type="button"
            onClick={() => loadNextFriendsPage()}
          >
            <p>
              Show more
            </p>
            <img
              src={MORE_VERTICAL_ICON}
              alt="Show more"
              width="36px"
            />
          </NextPageButton>
        }
      </Friends>
    </FriendListContainer>
  );
}

export default FriendList;
