import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const authService = {
  login: async (credentials) => {
    return await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: async (userData) => {
    return await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  logout: async () => {
    return await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  getCurrentUser: async () => {
    return await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
  },

  forgotPassword: async (email) => {
    return await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (token, newPassword) => {
    return await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  },
};

export default authService;
