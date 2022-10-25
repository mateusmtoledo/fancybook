import Friend from "./Friend";
import X_CIRCLE_ICON from "../img/x-circle.svg";
import { NoFriends, FriendListContainer, Friends } from "src/styles/FriendList";
import FriendSkeleton from "./Skeletons/FriendSkeleton";
import { Button } from "src/styles/AccountManagement";
import styled from "styled-components";

const NextPageButton = styled(Button)`
  width: 100%;
  background-color: var(--color-orange);
`;

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
          new Array(9).fill().map((_, i) => (
            <FriendSkeleton key={i} />
          ))
        }
      </Friends>
      { !friendsLoading && hasNextFriendsPage &&
        <NextPageButton
          type="button"
          onClick={() => loadNextFriendsPage()}
        >
          Show more
        </NextPageButton>
      }
    </FriendListContainer>
  );
}

export default FriendList;
