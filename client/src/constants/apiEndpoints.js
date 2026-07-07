export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: {
    PATIENT_SUMMARY: '/dashboard',
    DOCTOR_SUMMARY: '/dashboard',
    ADMIN_SUMMARY: '/dashboard',
  },
  PREDICTION: {
    HISTORY: '/predictions',
    NEW_PREDICTION: '/predictions',
    DETAILS: (id) => `/predictions/${id}`,
  },
  SIMULATOR: {
    HISTORY: '/simulations',
    PATIENT_HISTORY: (patientId) => `/simulations/patient/${patientId}`,
    RUN_SIMULATION: '/simulations',
    DETAILS: (id) => `/simulations/${id}`,
  },
  REPORTS: {
    LIST: '/reports',
    PATIENT_REPORTS: (patientId) => `/reports/patient/${patientId}`,
    DETAILS: (id) => `/reports/${id}`,
    UPLOAD: '/reports', // POST for creating/uploading
  },
  PROFILE: {
    GET: '/profile', // In our backend, usually /auth/me returns this, but if there's a dedicated route: /profile
    UPDATE: '/profile', // PUT
    UPLOAD_AVATAR: '/profile/upload-avatar', // PATCH
    UPDATE_PASSWORD: '/profile/update-password', // PATCH
  },
  DOCTOR: {
    PATIENTS: '/doctors/patients',
    APPOINTMENTS: '/doctors/appointments',
  },
  ADMIN: {
    USERS: '/admin/users',
    UPDATE_USER_STATUS: (id) => `/admin/users/${id}/status`,
    VERIFY_DOCTOR: (id) => `/admin/doctors/${id}/verify`,
  },
  APPOINTMENTS: {
    LIST: '/appointments',
    PATIENT_APPOINTMENTS: (patientId) => `/appointments/patient/${patientId}`,
    DOCTOR_APPOINTMENTS: (doctorId) => `/appointments/doctor/${doctorId}`,
    CREATE: '/appointments',
    DETAILS: (id) => `/appointments/${id}`,
    UPDATE: (id) => `/appointments/${id}`,
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    UNREAD: '/notifications/unread',
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id) => `/notifications/${id}`
  },
  ACTIVITY_LOGS: {
    ME: '/activity-logs/me',
    ALL: '/activity-logs'
  },
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
  }
};
