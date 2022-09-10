import styled from "styled-components";
import CHECK_ICON from "../img/check-square.svg";
import X_ICON from "../img/x-square.svg";
import Avatar from "../styles/Avatar";
import api from "../adapters/api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const StyledFriendRequest = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .requester {
    display: flex;
    gap: 8px;
    align-items: center;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }

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
      <div className="requester">
        <Avatar
          alt={`${friendRequest.firstName}'s avatar`}
          src={friendRequest.avatar}
        />
        <p>{friendRequest.fullName}</p>
      </div>
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
