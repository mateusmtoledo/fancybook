import Card from "../styles/Card";
import FriendRequest from "../components/FriendRequest";
import styled from "styled-components";
import USERS_ICON from "../img/users.svg";

const StyledFriendRequestList = styled(Card)`
  max-height: 300px;
  height: max-content;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.3rem;
    text-align: center;
    color: var(--color-orange);
    font-weight: 300;
  }

  .title {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
  }

  ul {
    overflow: auto;
    display: flex;
    flex-direction: column;
    flex: 1;

    li {
      list-style-type: none;
      padding: 12px 0;
      margin: 0 8px;
      border-bottom: 1px solid var(--color-gray-dark);

      &:last-child {
        border-bottom: none;
      }
    }

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      background: none;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-orange);
      border-radius: 20px;
    }
  }
`;

function FriendRequestList({ friendRequests }) {
  return (
    <StyledFriendRequestList>
      <div className="title">
        <img
          src={USERS_ICON}
          alt="Friend requests"
          width="24px"
          height="24px"
        />
        <h2>Friend Requests</h2>
      </div>
      {
        friendRequests.length
        ? <ul>
            {
              friendRequests.map((friendRequest) =>
                <FriendRequest
                  key={friendRequest._id}
                  friendRequest={friendRequest}
                />
              )
            }
          </ul>
        : <p>No friend requests</p>
      }
    </StyledFriendRequestList>
  );
}

export default FriendRequestList;
