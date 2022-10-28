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
import useFriends from "src/hooks/useFriends";
import UserBio from "src/components/UserBio";

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

function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const {
    friends,
    friendsLoading,
    hasNextFriendsPage,
    loadNextFriendsPage,
    friendCount,
    friendshipStatus,
  } = useFriends(userId);
  
  useEffect(() => {
    setUser(null);
    setUserLoading(true);
    getUser(userId).then((data) => {
      setUser(data.user);
      setUserLoading(false);
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
          <UserBio bio={user?.bio} />
          <FriendList
            friends={friends}
            friendsLoading={friendsLoading}
            friendCount={friendCount}
            hasNextFriendsPage={hasNextFriendsPage}
            loadNextFriendsPage={loadNextFriendsPage}
          />
        </Aside>
        <PostList userId={userId}/>
      </UserContent>
    </UserProfileMain>
  );
}

export default UserProfile;
