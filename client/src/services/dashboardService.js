import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const fetchDashboardStats = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.PATIENT_SUMMARY);
    // ApiResponse: res.data = { success, message, data: { ... } }
    return res.data?.data || res.data || {};
  } catch (err) {
    console.error('Dashboard stats failed:', err);
    return {};
  }
};

export const fetchRecentActivity = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.ACTIVITY_LOGS.ME);
    return res.data?.data || res.data || [];
  } catch {
    return [];
  }
};

export const fetchHealthMetrics = async () => {
  try {
    const res = await axiosInstance.get('/dashboard/patient/metrics');
    return res.data?.data || res.data || {};
  } catch {
    return {};
  }
};

export const fetchUpcomingAppointments = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.APPOINTMENTS.LIST);
    return res.data?.data || res.data || [];
  } catch {
    return [];
  }
};

export const fetchQuickActions = async () => [];

const dashboardService = {
  fetchDashboardStats,
  fetchRecentActivity,
  fetchHealthMetrics,
  fetchUpcomingAppointments,
  fetchQuickActions
};

export default dashboardService;