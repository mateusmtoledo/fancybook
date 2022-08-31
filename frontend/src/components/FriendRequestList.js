import { useContext, useEffect, useState } from "react";
import api from "../adapters/api";
import { UserContext } from "../contexts/UserContext";
import Avatar from "../styles/Avatar";
import Card from "../styles/Card";
import FriendRequest from "../styles/FriendRequest";
import styled from "styled-components";
import CHECK_ICON from "../img/check-square.svg";
import X_ICON from "../img/x-square.svg";
import USERS_ICON from "../img/users.svg";


function getUsers(userIds) {
  const promises = [];
  userIds.forEach((userId) => {
    promises.push(api.get(`/users/${userId}`));
  });
  return Promise.all(promises);
}

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

function FriendRequestList() {
  const { user } = useContext(UserContext);
  const [requesters, setRequesters] = useState([]);
  
  useEffect(() => {
    const friendRequestIds = user
      .friendList
      .filter((friendship) =>
        friendship.status === 'pending')
      .map((friendship) => friendship.user);
    getUsers(friendRequestIds)
      .then((response) => {
        setRequesters(response.map((element) => element.data.user));
      });
  }, [user]);

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
        requesters.length
        ? <ul>
            {
              requesters.map((requester) =>
                <li key={requester._id}>
                  <FriendRequest>
                    <div className="requester">
                      <Avatar
                        alt={`${requester.firstName}'s avatar`}
                        src={requester.avatar}
                        onError={(event) => {
                          if(event.target.src !== 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png') {
                            event.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
                          }
                        }}
                        width="32px"
                        height="32px"
                      />
                      <p>{requester.fullName}</p>
                    </div>
                    <div className="buttons">
                      <button>
                        <img
                          alt="Decline request"
                          src={X_ICON}
                          width="24px"
                          height="24px"
                        />
                      </button>
                      <button>
                        <img
                          alt="Accept request"
                          src={CHECK_ICON}
                          width="24px"
                          height="24px"
                        />
                      </button>
                    </div>
                  </FriendRequest>
                </li>
              )
            }
          </ul>
        : <p>No friend requests</p>
      }
    </StyledFriendRequestList>
  );
}

export default FriendRequestList;
