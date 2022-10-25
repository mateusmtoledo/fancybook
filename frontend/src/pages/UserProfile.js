import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../adapters/api";
import FriendList from "../components/FriendList";
import PostList from "../components/Posts/PostList";
import UserInfo from "../components/UserInfo";
import Main from "../styles/Main";
import Aside from "../styles/Aside";

const UserContent = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;

  @media (max-width: 650px) {
    // TODO improve friend list layout
    flex-direction: column;
  }
`;

const UserProfileMain = styled(Main)`
  flex-direction: column;
  justify-content: flex-start;
`;

async function getUser(userId) {
  return api.get(`/users/${userId}`).then((response) => response.data);
}

function getFriends(userId) {
  return api.get(`/users/${userId}/friends`).then((response) => response.data);
}

function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [friends, setFriends] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [friendCount, setFriendCount] = useState(0);
  const [hasNextFriendsPage, setHasNextFriendsPage] = useState(false);
  
  useEffect(() => {
    setUser(null);
    setFriends([]);
    setUserLoading(true);
    setFriendsLoading(true);
    getUser(userId).then((data) => {
      setUser(data.user);
      setUserLoading(false);
    });
    getFriends(userId).then((data) => {
      setFriends(data.friends);
      setFriendshipStatus(data.friendshipStatus);
      setFriendCount(data.friendCount);
      setFriendsLoading(false);
      setHasNextFriendsPage(data.hasNextFriendsPage);
    });
  }, [userId]);

  return (
    <UserProfileMain>
      <UserInfo
        user={user}
        userLoading={userLoading}
        friendshipStatus={friendshipStatus}
      />
      <UserContent>
        <Aside>
          <FriendList
            friends={friends}
            friendsLoading={friendsLoading}
            friendCount={friendCount}
            hasNextFriendsPage={hasNextFriendsPage}
          />
        </Aside>
        <PostList userId={userId}/>
      </UserContent>
    </UserProfileMain>
  );
}

export default UserProfile;
