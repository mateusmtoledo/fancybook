import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../adapters/api";
import FriendList from "../components/FriendList";
import Header from "../components/Header";
import PostList from "../components/PostList";
import UserInfo from "../components/UserInfo";
import Main from "../styles/Main";
import Aside from "../styles/Aside";

const UserContent = styled.div`
  display: flex;
  gap: 16px;
`;

async function getUser(userId) {
  return api.get(`/users/${userId}`).then((response) => response.data.user);
}

async function getPosts(userId, page) {
  const pageNumber = page || 0
  return api.get(`/users/${userId}/posts?page=${pageNumber}`).then((response) => response.data.posts);
}

function getFriends(userId) {
  return api.get(`/users/${userId}/friends`).then((response) => response.data.friends);
}

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    Promise.all([
      getUser(userId),
      getPosts(userId),
      getFriends(userId),
    ]).then((data) => {
      const [user, posts, friends] = data;
      if(posts.length < 8) setNoMorePosts(true);
      setUser(user);
      setPosts(posts);
      setFriends(friends);
    });
  }, [userId]);

  async function nextPage() {
    try {
      setPostsLoading(true);
      const newPosts = await getPosts(userId, page + 1);
      setPosts([...posts, ...newPosts]);
      setPage(page + 1);
      if(newPosts.length < 8) {
        setNoMorePosts(true);
      }
    } catch (err) {
      // TODO implement error handling
      console.log(err);
    }
    setPostsLoading(false);
  }

  return (
    <>
      {  
        user
        ? <>
          <Header />
          <Main column>
            <UserInfo user={user} />
            <UserContent>
              <Aside>
                <FriendList friends={friends} />
              </Aside>
              <PostList
                posts={posts.map((post) => ({ ...post, author: user }))}
                nextPage={nextPage}
                postsLoading={postsLoading}
                noMorePosts={noMorePosts}
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
