import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

// Existing
export const fetchUsers = async (params) => (await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS, { params })).data;
export const fetchDoctors = async (params) => (await axiosInstance.get('/admin/doctors', { params })).data;
export const fetchOverviewStats = async () => (await axiosInstance.get(API_ENDPOINTS.DASHBOARD.ADMIN_SUMMARY)).data;
export const fetchActivityLogs = async (params) => (await axiosInstance.get(API_ENDPOINTS.ACTIVITY_LOGS.ALL, { params })).data;
export const fetchAnalytics = async () => (await axiosInstance.get(API_ENDPOINTS.ADMIN.SYSTEM_STATS)).data;
export const toggleUserStatus = async (id, isActive) => (await axiosInstance.patch(API_ENDPOINTS.ADMIN.UPDATE_USER_STATUS(id), { isActive })).data;
export const verifyDoctor = async (id, isVerified) => (await axiosInstance.patch(API_ENDPOINTS.ADMIN.VERIFY_DOCTOR(id), { isVerified })).data;
export const deleteUser = async (id) => (await axiosInstance.delete(`/admin/users/${id}`)).data;
export const resolveReport = async (id) => (await axiosInstance.patch(`/admin/reports/${id}/resolve`)).data;
export const exportAuditLogs = async () => { return true; };
export const exportAdminData = async () => { return true; };
export const archiveReport = async (id) => (await axiosInstance.patch(`/admin/reports/${id}/archive`)).data;
export const deactivateUser = async (id) => (await axiosInstance.patch(API_ENDPOINTS.ADMIN.UPDATE_USER_STATUS(id), { isActive: false })).data;
export const deleteReport = async (id) => (await axiosInstance.delete(`/admin/reports/${id}`)).data;
export const downloadReport = async (id) => { return true; };
export const exportPlatformData = async () => { return true; };
export const fetchPlatformSettings = async () => (await axiosInstance.get('/admin/settings')).data;
export const fetchReports = async (params) => (await axiosInstance.get('/admin/reports', { params })).data;
export const filterLogs = (logs, query) => logs;
export const markLogAsRead = async (id) => (await axiosInstance.patch(`/activity-logs/${id}/read`)).data;
export const updatePlatformSettings = async (data) => (await axiosInstance.put('/admin/settings', data)).data;

// Missing
export const fetchAdminProfile = async () => (await axiosInstance.get('/auth/me')).data;
export const fetchAuditLogs = async () => (await axiosInstance.get('/admin/audit')).data;
export const fetchBackups = async () => [];
export const fetchNotifications = async () => (await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.LIST)).data;
export const fetchPatients = async () => (await axiosInstance.get('/admin/patients')).data;
export const fetchPermissions = async () => [];
export const fetchPlatformStats = async () => (await axiosInstance.get(API_ENDPOINTS.DASHBOARD.ADMIN_SUMMARY)).data;
export const fetchPredictionAnalytics = async () => [];
export const fetchRoles = async () => [];
export const fetchSystemHealth = async () => ({ status: 'healthy' });
export const fetchSystemSettings = async () => (await axiosInstance.get('/admin/settings')).data;
export const markNotificationRead = async (id) => (await axiosInstance.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id))).data;
export const runBackup = async () => { return true; };
export const updateSystemSettings = async (data) => (await axiosInstance.put('/admin/settings', data)).data;
export const updateUser = async (id, data) => (await axiosInstance.put(`/admin/users/${id}`, data)).data;

export const filterUsers = (users, query) => users;

const adminService = {
  fetchUsers,
  fetchDoctors,
  fetchOverviewStats,
  fetchActivityLogs,
  fetchAnalytics,
  toggleUserStatus,
  verifyDoctor,
  deleteUser,
  resolveReport,
  exportAuditLogs,
  exportAdminData,
  archiveReport,
  deactivateUser,
  deleteReport,
  downloadReport,
  exportPlatformData,
  fetchPlatformSettings,
  fetchReports,
  filterLogs,
  markLogAsRead,
  updatePlatformSettings,
  fetchAdminProfile,
  fetchAuditLogs,
  fetchBackups,
  fetchNotifications,
  fetchPatients,
  fetchPermissions,
  fetchPlatformStats,
  fetchPredictionAnalytics,
  fetchRoles,
  fetchSystemHealth,
  fetchSystemSettings,
  markNotificationRead,
  runBackup,
  updateSystemSettings,
  updateUser,
  filterUsers,
};

export default adminService;