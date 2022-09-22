import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../adapters/api";
import FriendList from "../components/FriendList";
import PostList from "../components/PostList";
import UserInfo from "../components/UserInfo";
import Main from "../styles/Main";
import Aside from "../styles/Aside";
import usePosts from "../hooks/usePosts";

const UserContent = styled.div`
  display: flex;
  gap: 16px;
`;

async function getUser(userId) {
  return api.get(`/users/${userId}`).then((response) => response.data.user);
}

function getFriends(userId) {
  return api.get(`/users/${userId}/friends`).then((response) => response.data.friends);
}

function UserProfile() {
  const { userId } = useParams();
  const {
    posts,
    hasNextPage,
    postsLoading,
    loadNextPostPage,
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

  return (
    <>
      {  
        user
        ? <>
          <Main column>
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
          </Main>
        </>
        : null
      }
    </>
  );
}

export default UserProfile;
