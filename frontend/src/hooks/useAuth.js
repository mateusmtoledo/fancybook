import { useCallback, useEffect, useState } from 'react';
import api from '../adapters/api';

function useAuth() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const login = useCallback(async () => {
    setUserLoading(true);
    try {
      const response = await api.get('/login');
      setUser(response.data.user);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
      console.log(err);
    }
    setUserLoading(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState(
        null,
        '',
        window.location.origin + window.location.pathname,
      );
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      login();
    } else {
      setUserLoading(false);
    }
  }, [login]);

  return {
    user,
    setUser,
    login,
    logout,
    userLoading,
  };
}

export default useAuth;
