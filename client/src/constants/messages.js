export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Successfully logged in.',
    REGISTER: 'Registration successful. Please verify your email.',
    PROFILE_UPDATE: 'Profile updated successfully.',
    SETTINGS_UPDATE: 'Settings saved successfully.',
    PREDICTION_COMPLETE: 'Prediction analysis completed.',
    SIMULATION_COMPLETE: 'Simulation completed successfully.',
    REPORT_GENERATED: 'Report generated successfully.',
  },
  ERROR: {
    DEFAULT: 'An unexpected error occurred. Please try again.',
    NETWORK: 'Unable to connect to the server. Please check your internet connection.',
    UNAUTHORIZED: 'Your session has expired. Please log in again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    SERVER_ERROR: 'Server encountered an error. Our team has been notified.',
    VALIDATION: 'Please check the form for errors.',
  },
  LOADING: {
    DEFAULT: 'Loading...',
    PREDICTING: 'Analyzing medical data...',
    SIMULATING: 'Running health simulation...',
    FETCHING_DATA: 'Fetching your data...',
  },
};
