/**
 * Environment Configuration
 * Centralized environment variables management
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'MediPredict+',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
