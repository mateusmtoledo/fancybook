import { useCallback, useEffect, useState } from "react";
import api from "../adapters/api";

async function getFriends() {
  const response = await api.get('/users/me/friends');
  return response.data;
}

function useAuth() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState({});

  async function refreshFriends() {
    if(localStorage.getItem('token')) {
      getFriends().then((data) => setFriends(data));
    }
  }
  
  const login = useCallback(async () => {
    if(localStorage.getItem('token')) {
      try {
        const response = await api.get('/login');
        setUser(response.data.user);
        await refreshFriends();
      } catch(err) {
        localStorage.removeItem('token');
        setUser(null);
        console.log(err);
      }
    }
  }, []);
  
  const logout = useCallback(() => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    login();
  }, [login]);

  return {
    user,
    setUser,
    friends,
    refreshFriends,
    login,
    logout
  };
}

export default useAuth;