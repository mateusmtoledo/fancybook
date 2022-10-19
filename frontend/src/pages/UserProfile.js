import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../adapters/api";
import FriendList from "../components/FriendList";
import PostList from "../components/Posts/PostList";
import UserInfo from "../components/UserInfo";
import Main from "../styles/Main";
import Aside from "../styles/Aside";
import usePosts from "../hooks/usePosts";
import { UserContext } from "../contexts/UserContext";

const UserContent = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 650px) {
    // TODO improve friend list layout
    flex-direction: column;
  }
`;

const UserProfileMain = styled(Main)`
  flex-direction: column;
`;

async function getUser(userId) {
  return api.get(`/users/${userId}`).then((response) => response.data.user);
}

function getFriends(userId) {
  return api.get(`/users/${userId}/friends`).then((response) => response.data.friends);
}

function UserProfile() {
  const { userId } = useParams();
  const { user: currentUser } = useContext(UserContext);
  const {
    posts,
    hasNextPage,
    postsLoading,
    loadNextPostPage,
    refreshPosts,
  } = usePosts(userId);

  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
    Promise.all([
      getUser(userId),
      getFriends(userId),
    ]).then((data) => {
      const [user, friends] = data;
      setUser(user);
      setFriends(friends);
    });
  }, [userId]);

  useEffect(() => {
    if(userId === currentUser._id) refreshPosts();
  }, [userId, currentUser, refreshPosts]);

  if (!user) return null;

  return (
    <UserProfileMain>
      <UserInfo user={user} />
      <UserContent>
        <Aside>
          <FriendList friends={friends} />
        </Aside>
        <PostList
          posts={posts}
          loadNextPostPage={loadNextPostPage}
          postsLoading={postsLoading}
          hasNextPage={hasNextPage}
        />
      </UserContent>
    </UserProfileMain>
  );
}

export default UserProfile;
