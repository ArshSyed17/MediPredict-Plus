import axios from 'axios';
import { ROUTES } from '../constants/routes';

// Base API URL from environment variables, fallback to localhost for development
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent infinite retry loops during token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attempt to get token from localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle Network Errors
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error('Request timed out. Please try again.'));
      }
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    const { status, data } = error.response;

    // 401 Unauthorized - Handle Refresh Token
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Attempt to refresh token
        const res = await axios.post(`${baseURL}/auth/refresh`, { token: refreshToken });
        
        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Force logout on refresh failure
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 403 Forbidden
    if (status === 403) {
      window.location.href = ROUTES.UNAUTHORIZED;
    }

    // 404 Not Found
    if (status === 404) {
      // You can redirect or just let the service handle it
      // window.location.href = ROUTES.NOT_FOUND;
    }

    // 500 Server Error
    if (status >= 500) {
      // window.location.href = ROUTES.SERVER_ERROR;
      console.error('Server error:', data?.message || error.message);
    }

    // Retry Logic for 5xx or Network Errors (Simple implementation)
    if ((status >= 500 || !status) && !originalRequest._retryCount) {
      originalRequest._retryCount = 1;
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
        axiosInstance(originalRequest)
      );
    }

    // Return custom error message from backend if available
    const errorMessage = data?.message || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
