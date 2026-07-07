import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const getHistory = async () => {
  try {
    const res = await axiosInstance.get(API_ENDPOINTS.PREDICTION.HISTORY);
    const data = res.data || res;
    return Array.isArray(data) ? data : (data?.data || []);
  } catch {
    return [];
  }
};
export const analyze = async (data) => {
  const res = await axiosInstance.post('/predictions/run', data);
  return res.data || res;
};
export const runPrediction = async (data) => {
  const res = await axiosInstance.post('/predictions/run', data);
  return res.data || res;
};
export const getDetails = async (id) => axiosInstance.get(API_ENDPOINTS.PREDICTION.DETAILS(id));

const predictionService = {
  getHistory,
  analyze,
  runPrediction,
  getDetails,
};
export default predictionService;