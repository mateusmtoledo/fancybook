import { useCallback, useEffect, useState } from 'react';
import api from '../adapters/api';

function useAuth() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const getUser = useCallback(async () => {
    setUserLoading(true);
    try {
      const response = await api.get('/login');
      setUser(response.data.user);
      setUserLoading(false);
    } catch (err) {
      setUser(null);
      setUserLoading(false);
      throw err;
    }
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await api.post('/login', credentials);
    setUser(response.data.user);
  }, []);

  const logout = useCallback(async () => {
    setUserLoading(true);
    try {
      await api.post('/logout');
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setUserLoading(false);
    window.history.pushState(null, '', window.location.origin);
  }, []);

  useEffect(() => {
    getUser()
      .then(() => setUserLoading(false))
      .catch((err) => {
        if (err?.statusCode === 401) return;
      });
  }, [getUser]);

  return {
    user,
    setUser,
    login,
    getUser,
    logout,
    userLoading,
  };
}

export default useAuth;
