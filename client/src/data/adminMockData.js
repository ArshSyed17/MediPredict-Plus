export const adminProfile = {
  id: "ADM-001",
  name: "Alex Rivera",
  email: "admin@medipredict.health",
  role: "Super Admin",
  avatarInitials: "AR",
  lastLogin: "2026-07-03T08:45:00.000Z",
};

export const overviewStats = {
  totalUsers: 1248,
  totalDoctors: 86,
  totalPatients: 1102,
  predictionsToday: 342,
  reportsGenerated: 1284,
  systemUptime: 99.97,
};

export const platformStats = {
  dailyActiveUsers: 428,
  weeklyPredictions: 2140,
  avgResponseTime: "124ms",
  errorRate: 0.03,
};

export const users = [
  { id: "U-1001", name: "John Doe", email: "john.doe@email.com", role: "patient", status: "active", joined: "2025-11-12", lastActive: "2026-07-03" },
  { id: "U-1002", name: "Dr. Sarah Mitchell", email: "s.mitchell@medipredict.health", role: "doctor", status: "active", joined: "2025-08-01", lastActive: "2026-07-03" },
  { id: "U-1003", name: "Emily Carter", email: "emily.carter@email.com", role: "patient", status: "active", joined: "2026-01-20", lastActive: "2026-07-02" },
  { id: "U-1004", name: "Robert Kim", email: "robert.kim@email.com", role: "patient", status: "active", joined: "2025-09-15", lastActive: "2026-07-01" },
  { id: "U-1005", name: "Lisa Wong", email: "lisa.wong@email.com", role: "patient", status: "inactive", joined: "2026-02-10", lastActive: "2026-05-28" },
  { id: "U-1006", name: "Dr. James Park", email: "j.park@medipredict.health", role: "doctor", status: "active", joined: "2025-10-05", lastActive: "2026-07-02" },
  { id: "U-1007", name: "Alex Rivera", email: "admin@medipredict.health", role: "admin", status: "active", joined: "2025-06-01", lastActive: "2026-07-03" },
];

export const doctors = [
  { id: "DR-2048", name: "Dr. Sarah Mitchell", email: "s.mitchell@medipredict.health", specialty: "Internal Medicine", verified: true, patientsAssigned: 248, accuracy: 95.2, status: "active" },
  { id: "DR-2051", name: "Dr. James Park", email: "j.park@medipredict.health", specialty: "Cardiology", verified: true, patientsAssigned: 186, accuracy: 94.8, status: "active" },
  { id: "DR-2055", name: "Dr. Priya Sharma", email: "p.sharma@medipredict.health", specialty: "Endocrinology", verified: false, patientsAssigned: 0, accuracy: 0, status: "pending" },
  { id: "DR-2060", name: "Dr. Michael Chen", email: "m.chen@medipredict.health", specialty: "Nephrology", verified: true, patientsAssigned: 142, accuracy: 93.5, status: "active" },
];

export const patients = [
  { id: "PT-10294", name: "John Doe", email: "john.doe@email.com", healthStatus: "Moderate", predictions: 12, reports: 5, healthScore: 76, doctor: "Dr. Mitchell" },
  { id: "PT-10312", name: "Emily Carter", email: "emily.carter@email.com", healthStatus: "Good", predictions: 4, reports: 2, healthScore: 84, doctor: "Dr. Mitchell" },
  { id: "PT-10401", name: "Robert Kim", email: "robert.kim@email.com", healthStatus: "High Risk", predictions: 18, reports: 8, healthScore: 62, doctor: "Dr. Park" },
  { id: "PT-10455", name: "Lisa Wong", email: "lisa.wong@email.com", healthStatus: "Good", predictions: 3, reports: 1, healthScore: 81, doctor: "Dr. Chen" },
];

export const predictionAnalytics = {
  daily: [
    { day: "Mon", predictions: 298 },
    { day: "Tue", predictions: 312 },
    { day: "Wed", predictions: 285 },
    { day: "Thu", predictions: 342 },
    { day: "Fri", predictions: 356 },
    { day: "Sat", predictions: 198 },
    { day: "Sun", predictions: 165 },
  ],
  monthly: [
    { month: "Jan", predictions: 4200 },
    { month: "Feb", predictions: 4580 },
    { month: "Mar", predictions: 5120 },
    { month: "Apr", predictions: 5680 },
    { month: "May", predictions: 6240 },
    { month: "Jun", predictions: 6890 },
  ],
  diseaseDistribution: [
    { disease: "Diabetes", count: 1840 },
    { disease: "Hypertension", count: 1520 },
    { disease: "Heart Disease", count: 980 },
    { disease: "CKD", count: 620 },
    { disease: "Stroke", count: 480 },
    { disease: "Liver", count: 310 },
  ],
  accuracyTrend: [
    { month: "Jan", accuracy: 91.5 },
    { month: "Feb", accuracy: 92.8 },
    { month: "Mar", accuracy: 93.4 },
    { month: "Apr", accuracy: 94.1 },
    { month: "May", accuracy: 94.8 },
    { month: "Jun", accuracy: 95.2 },
  ],
};

export const systemHealth = {
  api: { status: "operational", latency: "42ms", uptime: 99.98 },
  database: { status: "operational", connections: 24, uptime: 99.99 },
  storage: { used: 68, total: 100, unit: "GB" },
  memory: { used: 72, total: 100 },
  cpu: { used: 45, total: 100 },
};

export const auditLogs = [
  { id: "AL-001", type: "login", user: "admin@medipredict.health", action: "Admin login", timestamp: "2026-07-03T08:45:00.000Z", ip: "192.168.1.10" },
  { id: "AL-002", type: "role", user: "admin@medipredict.health", action: "Changed role for U-1005 to patient", timestamp: "2026-07-02T16:30:00.000Z", ip: "192.168.1.10" },
  { id: "AL-003", type: "prediction", user: "john.doe@email.com", action: "Diabetes prediction completed", timestamp: "2026-07-02T10:30:00.000Z", ip: "10.0.0.45" },
  { id: "AL-004", type: "report", user: "system", action: "Report RPT-2026-0841 generated", timestamp: "2026-07-02T10:35:00.000Z", ip: "internal" },
  { id: "AL-005", type: "system", user: "system", action: "Scheduled backup completed", timestamp: "2026-07-02T02:00:00.000Z", ip: "internal" },
];

export const activityLogs = [
  { id: "AC-001", message: "New patient registration: Lisa Wong", time: "2026-07-01T14:20:00.000Z" },
  { id: "AC-002", message: "Doctor verification approved: Dr. James Park", time: "2026-06-30T11:00:00.000Z" },
  { id: "AC-003", message: "High risk alert triggered for Robert Kim", time: "2026-06-28T16:00:00.000Z" },
];

export const roles = [
  { id: "admin", label: "Admin", permissions: ["all"], users: 3 },
  { id: "doctor", label: "Doctor", permissions: ["view_patients", "review_predictions", "manage_notes"], users: 86 },
  { id: "patient", label: "Patient", permissions: ["view_own_data", "run_predictions", "view_reports"], users: 1102 },
];

export const permissions = [
  { id: "all", label: "Full Access", description: "Unrestricted platform access" },
  { id: "view_patients", label: "View Patients", description: "Access patient records" },
  { id: "review_predictions", label: "Review Predictions", description: "Review AI predictions" },
  { id: "manage_notes", label: "Manage Notes", description: "Add and edit consultation notes" },
  { id: "view_own_data", label: "View Own Data", description: "Access personal health data" },
  { id: "run_predictions", label: "Run Predictions", description: "Execute AI disease predictions" },
  { id: "view_reports", label: "View Reports", description: "Access medical reports" },
];

export const reports = [
  { id: "RPT-2026-0841", patient: "John Doe", disease: "Diabetes", date: "2026-07-02", status: "active" },
  { id: "RPT-2026-0722", patient: "John Doe", disease: "Hypertension", date: "2026-06-22", status: "active" },
  { id: "RPT-2026-0610", patient: "Emily Carter", disease: "Heart Disease", date: "2026-06-10", status: "archived" },
  { id: "RPT-2026-0628", patient: "Robert Kim", disease: "CKD", date: "2026-06-28", status: "active" },
];

export const notifications = [
  { id: "N1", type: "alert", title: "System Alert", message: "Database backup completed successfully", time: "2026-07-03T02:00:00.000Z", read: false },
  { id: "N2", type: "server", title: "Server Notification", message: "API response time spike detected — resolved", time: "2026-07-02T18:30:00.000Z", read: false },
  { id: "N3", type: "registration", title: "New Registration", message: "3 new patient registrations today", time: "2026-07-03T09:00:00.000Z", read: true },
  { id: "N4", type: "critical", title: "Critical Warning", message: "Storage usage at 68% — consider expansion", time: "2026-07-01T12:00:00.000Z", read: true },
];

export const systemSettings = {
  platformName: "MediPredict+",
  supportEmail: "support@medipredict.health",
  emailNotifications: true,
  smsNotifications: false,
  maintenanceMode: false,
  theme: "dark",
  sessionTimeout: 30,
  twoFactorRequired: false,
};

export const backups = [
  { id: "BK-001", date: "2026-07-03T02:00:00.000Z", size: "2.4 GB", type: "full", status: "completed" },
  { id: "BK-002", date: "2026-07-02T02:00:00.000Z", size: "2.3 GB", type: "full", status: "completed" },
  { id: "BK-003", date: "2026-07-01T02:00:00.000Z", size: "1.1 GB", type: "incremental", status: "completed" },
];
