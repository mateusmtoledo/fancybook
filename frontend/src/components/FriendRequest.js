import styled from "styled-components";
import CHECK_ICON from "../img/check-square.svg";
import X_ICON from "../img/x-square.svg";
import api from "../adapters/api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import UserDisplayInfo from "./UserDisplayInfo";

const StyledFriendRequest = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .buttons {
    display: flex;
    gap: 4px;
    align-items: center;
    
    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`;

function FriendRequest({ friendRequest, refreshPosts }) {
  const { refreshFriends } = useContext(UserContext);

  return (
    <StyledFriendRequest>
      <UserDisplayInfo user={friendRequest} />
      <div className="buttons">
        <button onClick={async () => {
          try {
            await api.delete(`/users/${friendRequest._id}/friends`);
          } catch (err) {
            // TODO implement error handling
            console.log(err);
          }
          refreshFriends();
          refreshPosts();
        }}>
          <img
            alt="Decline request"
            src={X_ICON}
            width="24px"
            height="24px"
          />
        </button>
        <button onClick={async () => {
          try {
            await api.put(`/users/${friendRequest._id}/friends`);
          } catch (err) {
            // TODO implement error handling
            console.log(err);
          }
          refreshFriends();
          refreshPosts();
        }}>
          <img
            alt="Accept request"
            src={CHECK_ICON}
            width="24px"
            height="24px"
          />
        </button>
      </div>
    </StyledFriendRequest>
  );
}

export default FriendRequest;
