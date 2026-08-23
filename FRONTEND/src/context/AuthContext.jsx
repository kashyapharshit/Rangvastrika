import { createContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/authApi';
import { AUTH_STORAGE_KEY } from '../utils/constants';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [auth]);

  const login = async (payload) => {
    const data = await authApi.login(payload);
    setAuth(data);
    return data;
  };

  const register = async (payload) => {
    const data = await authApi.register(payload);
    setAuth(data);
    return data;
  };

  const logout = () => setAuth(null);

  const value = useMemo(
    () => ({
      user: auth,
      token: auth?.token,
      isAuthenticated: Boolean(auth?.token),
      isAdmin: auth?.role === 'admin',
      login,
      register,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
