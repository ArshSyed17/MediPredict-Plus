import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const aiService = {
  analyzeSymptoms: async (data) => await axiosInstance.post(API_ENDPOINTS.AI.ANALYZE_SYMPTOMS, data),
  chat: async (data) => await axiosInstance.post(API_ENDPOINTS.AI.CHAT, data),
};
export default aiService;