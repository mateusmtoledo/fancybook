import FriendRequest from "../components/FriendRequest";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import api from "src/adapters/api";
import FriendRequestSkeleton from "./Skeletons/FriendRequestSkeleton";

const FriendRequestListContainer = styled.div`
  width: 100%;

  h2 {
    margin-bottom: 16px;
  }
`;

const FriendRequests = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  font-family: 'Outfit', sans-serif;
`;

function FriendRequestList() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/users/me/friend-requests').then((response) => {
      const { data } = response;
      setFriendRequests(data.friendRequests);
      setLoading(false);
    });
  }, []);

  return (
    <FriendRequestListContainer>
      <h2>Friend Requests</h2>
      <FriendRequests>
        {
          loading
          ? new Array(12).fill().map((_, i) => (
            <FriendRequestSkeleton key={i} />
          ))
          : friendRequests.length
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
