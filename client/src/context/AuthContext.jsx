import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client.js';

const AuthContext = createContext(null);

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem('ems_user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem('ems_user');
    localStorage.removeItem('ems_token');
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getSavedUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ems_token');
    if (!token) {
      return;
    }

    setLoading(true);
    api.get('/auth/me')
      .then((response) => {
        setUser(response.data);
        localStorage.setItem('ems_user', JSON.stringify(response.data));
      })
      .catch(() => {
        localStorage.removeItem('ems_token');
        localStorage.removeItem('ems_user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('ems_token', response.data.token);
    localStorage.setItem('ems_user', JSON.stringify(response.data.user));
    setUser(response.data.user);
  };

  const register = async ({ name, email, password, adminCode }) => {
    const response = await api.post('/auth/register', { name, email, password, adminCode });
    localStorage.setItem('ems_token', response.data.token);
    localStorage.setItem('ems_user', JSON.stringify(response.data.user));
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('ems_token');
    localStorage.removeItem('ems_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
