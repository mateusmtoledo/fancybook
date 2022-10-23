import FriendRequest from "../components/FriendRequest";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const FriendRequestListContainer = styled.div`
  width: 100%;
`;

const FriendRequests = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  font-family: 'Outfit', sans-serif;
`;

function FriendRequestList({ refreshPosts }) {
  const { friends } = useContext(UserContext);
  const friendRequests = friends.pending || [];

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
                refreshPosts={refreshPosts}
              />
            )
          : <p>No friend requests</p>
        }
      </FriendRequests>
    </FriendRequestListContainer>
  );
}

export default FriendRequestList;
