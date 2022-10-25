import { useCallback, useEffect, useState } from "react";
import api from "../adapters/api";

function useAuth() {
  const [user, setUser] = useState(null);

  const login = useCallback(async () => {
    if(localStorage.getItem('token')) {
      try {
        const response = await api.get('/login');
        setUser(response.data.user);
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
    login,
    logout
  };
}

export default useAuth;