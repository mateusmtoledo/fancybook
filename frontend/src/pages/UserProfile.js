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
  return api.get(`/users/${userId}`).then((response) => response.data.user);
}

function getFriends(userId) {
  return api.get(`/users/${userId}/friends`).then((response) => response.data.friends);
}

function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [friendsLoading, setFriendsLoading] = useState(true);
  
  useEffect(() => {
    getUser(userId).then((userData) => {
      setUser(userData);
      setUserLoading(false);
    });
    getFriends(userId).then((friendsData) => {
      setFriends(friendsData);
      setFriendsLoading(false);
    });
  }, [userId]);

  return (
    <UserProfileMain>
      <UserInfo user={user} userLoading={userLoading} />
      <UserContent>
        <Aside>
          <FriendList friends={friends} friendsLoading={friendsLoading} />
        </Aside>
        <PostList userId={userId}/>
      </UserContent>
    </UserProfileMain>
  );
}

export default UserProfile;
