import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const fetchAppointments = async () => (await axiosInstance.get(API_ENDPOINTS.APPOINTMENTS.LIST)).data;
export const bookAppointment = async (data) => (await axiosInstance.post(API_ENDPOINTS.APPOINTMENTS.CREATE, data)).data;
export const updateAppointment = async (id, data) => (await axiosInstance.patch(API_ENDPOINTS.APPOINTMENTS.UPDATE(id), data)).data;
export const cancelAppointment = async (id) => (await axiosInstance.patch(API_ENDPOINTS.APPOINTMENTS.UPDATE(id), { status: 'Cancelled' })).data;
export const rescheduleAppointment = async (id, data) => (await axiosInstance.patch(API_ENDPOINTS.APPOINTMENTS.UPDATE(id), data)).data;

const appointmentService = {
  fetchAppointments,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
  rescheduleAppointment
};

export default appointmentService;