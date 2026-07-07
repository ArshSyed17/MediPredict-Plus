import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const reportService = {
  getList: async () => await axiosInstance.get(API_ENDPOINTS.REPORTS.LIST),
  getDetails: async (id) => await axiosInstance.get(API_ENDPOINTS.REPORTS.DETAILS(id)),
  generate: async (data) => await axiosInstance.post(API_ENDPOINTS.REPORTS.GENERATE, data),
  download: async (id) => await axiosInstance.get(API_ENDPOINTS.REPORTS.DOWNLOAD(id), { responseType: 'blob' }),
};
export default reportService;