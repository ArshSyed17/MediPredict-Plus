import axios from 'axios';

/**
 * Axios Instance Configuration
 * Configured with base URL, interceptors for JWT handling, and error handling
 * Ready to connect to Express + MongoDB backend
 */

// TODO: Update base URL when backend is ready
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically adds JWT token to requests
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles token refresh and error responses
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          // TODO: Implement token refresh logic when backend is ready
          // const response = await axios.post('/api/auth/refresh-token', { refreshToken });
          // const { token } = response.data;
          // localStorage.setItem('token', token);
          // originalRequest.headers.Authorization = `Bearer ${token}`;
          // return axiosInstance(originalRequest);
          
          // For now, just logout on 401
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    
    // TODO: Add toast notification here when toast library is integrated
    // toast.error(errorMessage);

    return Promise.reject(error);
  }
);

/**
 * Helper functions for common API patterns
 */
export const api = {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  patch: (url, data, config) => axiosInstance.patch(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),
};

export default axiosInstance;
