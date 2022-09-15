import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import USER_PLUS_ICON from "../img/user-plus.svg";
import USER_X_ICON from "../img/user-x.svg";
import USER_CHECK_ICON from "../img/user-check.svg";
import USER_MINUS_ICON from "../img/user-minus.svg";

function FriendshipButtons({ targetUser }) {
  const { friends } = useContext(UserContext);
  const sent = friends.sent && friends.sent.some((friend) => friend._id === targetUser._id);
  const pending = friends.pending && friends.pending.some((friend) => friend._id === targetUser._id);
  const usersAreFriends = friends.friends && friends.friends.some((friend) => friend._id === targetUser._id);

  if (sent) {
    return (
      <button>
        <img src={USER_X_ICON} alt="Cancel friend request" />
        Cancel
      </button>
    );
  } else if (pending) {
    return (
      <>
        <button>
          <img src={USER_X_ICON} alt="Decline friend request" />
          Decline
        </button>
        <button>
          <img src={USER_CHECK_ICON} alt="Accept friend request" />
          Accept
        </button>
      </>
    );
  } else if (usersAreFriends) {
    return (
      <button>
        <img src={USER_MINUS_ICON} alt="Remove friend" />
        Remove
      </button>
    );
  } else {
    return (
      <button>
        <img src={USER_PLUS_ICON} alt="Add as a friend" />
        Add
      </button>
    );
  }
}

export default FriendshipButtons;
