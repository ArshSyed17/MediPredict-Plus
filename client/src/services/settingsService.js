import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const fetchSettings = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.SETTINGS.GET);
    // ApiResponse wrapper: response.data = { success, message, data: settingsObj }
    return response.data?.data || response.data || {};
  } catch (err) {
    console.error('Failed to fetch settings:', err);
    return {};
  }
};

export const updateSettings = async (section, data) => {
  try {
    const settingsData = { [section]: data };
    const response = await axiosInstance.put(API_ENDPOINTS.SETTINGS.UPDATE, settingsData);
    return response.data?.data || response.data || {};
  } catch (err) {
    console.error('Failed to update settings:', err);
    return {};
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.PROFILE.GET);
    return response.data;
  } catch (err) {
    console.error('Failed to delete account:', err);
    return null;
  }
};

export const toggleDeviceConnection = async (deviceId) => {
  try {
    const response = await axiosInstance.patch(`${API_ENDPOINTS.SETTINGS.UPDATE}/device/${deviceId}`);
    return response.data?.data || response.data || {};
  } catch (err) {
    console.error('Failed to toggle device:', err);
    return {};
  }
};

export const changePassword = async (data) => {
  const response = await axiosInstance.patch('/profile/update-password', data);
  return response.data;
};

export const exportUserData = async () => {
  return true;
};

const settingsService = {
  fetchSettings,
  updateSettings,
  deleteAccount,
  toggleDeviceConnection,
  changePassword,
  exportUserData
};

export default settingsService;