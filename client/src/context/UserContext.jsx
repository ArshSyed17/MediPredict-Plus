import React, { createContext, useState, useCallback } from 'react';
import profileService from '../services/profileService';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      setLoading(true);
      const data = await profileService.updateProfile(updates);
      setProfile(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    profile,
    loading,
    fetchProfile,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
