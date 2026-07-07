export const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

export const PERMISSIONS = {
  // Patient permissions
  VIEW_OWN_PREDICTIONS: 'view:own_predictions',
  CREATE_PREDICTIONS: 'create:predictions',
  RUN_SIMULATIONS: 'run:simulations',
  VIEW_OWN_REPORTS: 'view:own_reports',

  // Doctor permissions
  VIEW_ASSIGNED_PATIENTS: 'view:assigned_patients',
  VIEW_PATIENT_PREDICTIONS: 'view:patient_predictions',
  MANAGE_APPOINTMENTS: 'manage:appointments',
  ADD_CLINICAL_NOTES: 'add:clinical_notes',

  // Admin permissions
  MANAGE_USERS: 'manage:users',
  VIEW_ALL_DATA: 'view:all_data',
  MANAGE_SYSTEM_SETTINGS: 'manage:system_settings',
};
