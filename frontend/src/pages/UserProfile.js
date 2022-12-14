import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../adapters/api';
import FriendList from '../components/Friends/FriendList';
import PostList from '../components/Posts/PostList';
import UserInfo from '../components/UserProfile/UserInfo';
import Main from '../styles/Main';
import Aside from '../styles/Aside';
import useFriends from 'src/hooks/useFriends';
import UserAbout from 'src/components/UserProfile/UserAbout';

const UserContent = styled.div`
  display: flex;
  gap: 16px;
  max-height: max-content;

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
    setFriends,
    friendsLoading,
    hasNextFriendsPage,
    loadNextFriendsPage,
    friendCount,
    setFriendCount,
    friendshipStatus,
    setFriendshipStatus,
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
        setFriendshipStatus={setFriendshipStatus}
        setFriends={setFriends}
        setFriendCount={setFriendCount}
      />
      <UserContent>
        <Aside>
          <UserAbout bio={user?.bio} userLoading={userLoading} />
          <FriendList
            friends={friends}
            friendsLoading={friendsLoading}
            friendCount={friendCount}
            hasNextFriendsPage={hasNextFriendsPage}
            loadNextFriendsPage={loadNextFriendsPage}
          />
        </Aside>
        <PostList userId={userId} />
      </UserContent>
    </UserProfileMain>
  );
}

export default UserProfile;
