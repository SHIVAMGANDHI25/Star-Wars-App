import { useState, useEffect } from 'react';
import { isAuthenticated, login as authLogin, logout as authLogout } from '../utils/auth';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const result = authLogin(username, password);
    if (result.success) {
      setAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    authLogout();
    setAuthenticated(false);
  };

  return { authenticated, loading, login, logout };
};
