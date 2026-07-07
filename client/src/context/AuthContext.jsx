import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { ROUTES } from '../constants';

import { useContext } from 'react';

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authService.getCurrentUser();
      // Backend returns User object inside res.data
      setUser(res.data || null);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const res = await authService.login(credentials);
      // res has structure: { statusCode, message, data: { user, token, refreshToken } }
      const token = res.data?.token;
      const refreshToken = res.data?.refreshToken;
      const user = res.data?.user;

      if (token) localStorage.setItem('accessToken', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      setUser(user || null);
      setIsAuthenticated(true);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await authService.register(userData);
      // res has structure: { statusCode, message, data: { user, token, refreshToken } }
      const token = res.data?.token;
      const refreshToken = res.data?.refreshToken;
      const user = res.data?.user;

      if (token) localStorage.setItem('accessToken', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      setUser(user || null);
      setIsAuthenticated(true);
      return res;
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = ROUTES.LOGIN;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    fetchUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
