import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../adapters/api";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";
import Main from "../styles/Main";

async function getUserData(userId) {
  const user = await api.get(`/users/${userId}`);
  const posts = await api.get(`/users/${userId}/posts`);
  return {
    user: user.data.user,
    posts: posts.data.posts,
  };
}

function UserProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null); 
  
  useEffect(() => {
    getUserData(userId).then((data) => {
      console.log(data);
      setUserData(data);
    });
  }, [userId]);

  return (
    <>
      {  
        userData
        ? <>
          <Header />
          <Main>
            <UserInfo user={userData.user} />
          </Main>
        </>
        : null
      }
    </>
  );
}

export default UserProfile;
