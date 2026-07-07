import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const notificationService = {
  getNotifications: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.LIST);
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  getUnreadNotifications: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.UNREAD);
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  markAsRead: async (id) => {
    try {
      const response = await axiosInstance.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
      return response.data?.data || response.data;
    } catch {
      return null;
    }
  },

  markAllAsRead: async () => {
    try {
      const response = await axiosInstance.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
      return response.data?.data || response.data;
    } catch {
      return null;
    }
  },

  deleteNotification: async (id) => {
    try {
      const response = await axiosInstance.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE(id));
      return response.data?.data || response.data;
    } catch {
      return null;
    }
  }
};

export default notificationService;