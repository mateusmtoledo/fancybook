import FriendRequest from "../components/FriendRequest";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import api from "src/adapters/api";

const FriendRequestListContainer = styled.div`
  width: 100%;
`;

const FriendRequests = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  font-family: 'Outfit', sans-serif;
`;

function FriendRequestList() {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    api.get('/users/me/friend-requests').then((response) => {
      const { data } = response;
      setFriendRequests(data.friendRequests);
    });
  }, []);

  return (
    <FriendRequestListContainer>
      <h2>Friend Requests</h2>
      <FriendRequests>
        {
          friendRequests.length
          ?
            friendRequests.map((friendRequest) =>
              <FriendRequest
                key={friendRequest._id}
                friendRequest={friendRequest}
              />
            )
          : <p>No friend requests</p>
        }
      </FriendRequests>
    </FriendRequestListContainer>
  );
}

export default FriendRequestList;
