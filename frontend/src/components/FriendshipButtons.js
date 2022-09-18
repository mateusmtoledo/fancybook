import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import USER_PLUS_ICON from "../img/user-plus.svg";
import USER_X_ICON from "../img/user-x.svg";
import USER_CHECK_ICON from "../img/user-check.svg";
import USER_MINUS_ICON from "../img/user-minus.svg";
import api from "../adapters/api";

function FriendshipButtons({ targetUser }) {
  const { user, friends, refreshFriends } = useContext(UserContext);
  if (targetUser._id === user._id) return null;
  const sent = friends.sent && friends.sent.some((friend) => friend._id === targetUser._id);
  const pending = friends.pending && friends.pending.some((friend) => friend._id === targetUser._id);
  const usersAreFriends = friends.friends && friends.friends.some((friend) => friend._id === targetUser._id);

  if (sent) {
    return (
      <button onClick={() => {
        api
          .delete(`/users/${targetUser._id.toString()}/friends`)
          .then(() => refreshFriends());
      }}>
        <img src={USER_X_ICON} alt="Cancel friend request" />
        Cancel
      </button>
    );
  } else if (pending) {
    return (
      <>
        <button onClick={() => {
          api
            .delete(`/users/${targetUser._id.toString()}/friends`)
            .then(() => refreshFriends());
        }}>
          <img src={USER_X_ICON} alt="Decline friend request" />
          Decline
        </button>
        <button onClick={() => {
          api
            .put(`/users/${targetUser._id.toString()}/friends`)
            .then(() => refreshFriends());
        }}>
          <img src={USER_CHECK_ICON} alt="Accept friend request" />
          Accept
        </button>
      </>
    );
  } else if (usersAreFriends) {
    return (
      <button onClick={() => {
        api
          .delete(`/users/${targetUser._id.toString()}/friends`)
          .then(() => refreshFriends());
      }}>
        <img src={USER_MINUS_ICON} alt="Remove friend" />
        Remove
      </button>
    );
  } else {
    return (
      <button onClick={() => {
        api
          .post(`/users/${targetUser._id.toString()}/friends`)
          .then(() => refreshFriends());
      }}>
        <img src={USER_PLUS_ICON} alt="Add as a friend" />
        Add
      </button>
    );
  }
}

export default FriendshipButtons;
