import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const fetchPatients = async () => (await axiosInstance.get(API_ENDPOINTS.DOCTOR.PATIENTS)).data;
export const fetchAppointments = async () => (await axiosInstance.get(API_ENDPOINTS.DOCTOR.APPOINTMENTS)).data;
export const fetchPatientById = async (id) => (await axiosInstance.get(`/patients/${id}`)).data;
export const fetchOverviewStats = async () => (await axiosInstance.get(API_ENDPOINTS.DASHBOARD.DOCTOR_SUMMARY)).data;
export const fetchAnalytics = async () => (await axiosInstance.get('/doctor/analytics')).data;
export const fetchDoctorProfile = async () => (await axiosInstance.get('/auth/me')).data;
export const fetchNotifications = async () => (await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.LIST)).data;
export const markNotificationRead = async (id) => (await axiosInstance.patch(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id))).data;
export const addConsultationNote = async (patientId, note) => (await axiosInstance.post(`/patients/${patientId}/notes`, { note })).data;
export const updateConsultationNote = async (patientId, noteId, note) => (await axiosInstance.put(`/patients/${patientId}/notes/${noteId}`, { note })).data;
export const exportDoctorData = async () => { /* Dummy export */ return true; };
export const filterPatients = (patients, query) => patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

const doctorService = {
  fetchPatients,
  fetchAppointments,
  fetchPatientById,
  fetchOverviewStats,
  fetchAnalytics,
  fetchDoctorProfile,
  fetchNotifications,
  markNotificationRead,
  addConsultationNote,
  updateConsultationNote,
  exportDoctorData,
  filterPatients,
};

export default doctorService;