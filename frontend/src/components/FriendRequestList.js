import FriendRequest from "../components/FriendRequest";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const FriendRequestListContainer = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  font-family: 'Outfit', sans-serif;
  h2 {
    grid-column: 1 / -1;
  }
`;

function FriendRequestList({ refreshPosts }) {
  const { friends } = useContext(UserContext);
  const friendRequests = friends.pending || [];

  return (
    <FriendRequestListContainer>
      <h2>Friend Requests</h2>
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
    </FriendRequestListContainer>
  );
}

export default FriendRequestList;
