import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PROFILE.GET);
    // Backend returns ApiResponse: { success, message, data: userObj }
    return response.data?.data || response.data || null;
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    return null;
  }
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.put(API_ENDPOINTS.PROFILE.UPDATE, data);
  return response.data;
};

export const updatePassword = async (data) => {
  const response = await axiosInstance.patch(API_ENDPOINTS.PROFILE.UPDATE_PASSWORD, data);
  return response.data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await axiosInstance.patch(API_ENDPOINTS.PROFILE.UPLOAD_AVATAR, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const profileService = {
  fetchProfile,
  updateProfile,
  updatePassword,
  uploadAvatar
};

export default profileService;