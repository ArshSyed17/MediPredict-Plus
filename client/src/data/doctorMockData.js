export const doctorProfile = {
  id: "DR-2048",
  name: "Dr. Sarah Mitchell",
  specialty: "Internal Medicine & Preventive Care",
  email: "s.mitchell@medipredict.health",
  phone: "+1 (555) 412-8800",
  hospital: "MediPredict Clinical Center",
  avatarInitials: "SM",
  license: "MD-884920",
};

export const overviewStats = {
  totalPatients: 248,
  todayConsultations: 12,
  pendingReports: 7,
  highRiskPatients: 18,
};

export const patients = [
  {
    id: "PT-10294",
    name: "John Doe",
    age: 42,
    gender: "Male",
    bloodGroup: "O+",
    riskLevel: "Moderate",
    healthScore: 76,
    lastVisit: "2026-07-01",
    conditions: ["Mild Hypertension", "Prediabetes"],
    email: "john.doe@email.com",
    phone: "+1 (555) 234-7890",
    medicalHistory: ["Family history of diabetes", "Managed hypertension since 2023"],
    predictions: [
      { id: "PRD-001", disease: "Type 2 Diabetes", risk: 28, confidence: 94.2, date: "2026-07-02" },
      { id: "PRD-002", disease: "Hypertension", risk: 34, confidence: 91.8, date: "2026-06-22" },
    ],
    timeline: [
      { date: "2026-07-02", event: "AI Diabetes prediction completed" },
      { date: "2026-06-28", event: "Lifestyle simulation run" },
      { date: "2026-06-22", event: "Hypertension report generated" },
    ],
    reports: [
      { id: "RPT-2026-0841", title: "Diabetes Risk Report", date: "2026-07-02", status: "Reviewed" },
      { id: "RPT-2026-0722", title: "Hypertension Assessment", date: "2026-06-22", status: "Pending" },
    ],
    metrics: [
      { label: "BP", value: "128/82", trend: "stable" },
      { label: "Glucose", value: "108 mg/dL", trend: "down" },
      { label: "BMI", value: "26.4", trend: "down" },
      { label: "HR", value: "74 bpm", trend: "stable" },
    ],
    latestPrediction: {
      disease: "Type 2 Diabetes",
      risk: 28,
      confidence: 94.2,
      factors: [
        { factor: "BMI", contribution: 18 },
        { factor: "Blood Sugar", contribution: 22 },
        { factor: "Family History", contribution: 14 },
        { factor: "Activity Level", contribution: 10 },
      ],
      recommendations: [
        "Increase daily steps to 8,000+",
        "Adopt low-glycemic meal planning",
        "Schedule fasting glucose test in 4 weeks",
      ],
    },
    latestReport: {
      id: "RPT-2026-0841",
      summary: "Moderate diabetes risk with reversible lifestyle factors.",
      healthScore: 76,
      riskCategory: "Moderate",
    },
    notes: [
      { id: "N1", date: "2026-07-01", author: "Dr. Mitchell", text: "Discussed diet changes and weekly glucose monitoring." },
      { id: "N2", date: "2026-06-15", author: "Dr. Mitchell", text: "Patient motivated to improve activity levels." },
    ],
  },
  {
    id: "PT-10312",
    name: "Emily Carter",
    age: 35,
    gender: "Female",
    bloodGroup: "A+",
    riskLevel: "Low",
    healthScore: 84,
    lastVisit: "2026-07-03",
    conditions: ["Seasonal Allergies"],
    email: "emily.carter@email.com",
    phone: "+1 (555) 876-1234",
    medicalHistory: ["No chronic conditions", "Annual wellness visits"],
    predictions: [
      { id: "PRD-003", disease: "Heart Disease", risk: 12, confidence: 96.1, date: "2026-06-30" },
    ],
    timeline: [{ date: "2026-06-30", event: "Cardiac screening prediction" }],
    reports: [{ id: "RPT-2026-0610", title: "Cardiac Screening", date: "2026-06-30", status: "Reviewed" }],
    metrics: [
      { label: "BP", value: "118/76", trend: "stable" },
      { label: "Glucose", value: "92 mg/dL", trend: "stable" },
      { label: "BMI", value: "22.8", trend: "stable" },
      { label: "HR", value: "68 bpm", trend: "stable" },
    ],
    latestPrediction: {
      disease: "Heart Disease",
      risk: 12,
      confidence: 96.1,
      factors: [
        { factor: "Blood Pressure", contribution: 6 },
        { factor: "Cholesterol", contribution: 8 },
        { factor: "Activity", contribution: 4 },
      ],
      recommendations: ["Maintain current exercise routine", "Annual lipid panel"],
    },
    latestReport: {
      id: "RPT-2026-0610",
      summary: "Low cardiovascular risk profile.",
      healthScore: 84,
      riskCategory: "Low",
    },
    notes: [],
  },
  {
    id: "PT-10401",
    name: "Robert Kim",
    age: 58,
    gender: "Male",
    bloodGroup: "B+",
    riskLevel: "High",
    healthScore: 62,
    lastVisit: "2026-06-28",
    conditions: ["Type 2 Diabetes", "Hypertension"],
    email: "robert.kim@email.com",
    phone: "+1 (555) 445-6677",
    medicalHistory: ["Diagnosed diabetes 2019", "Hypertension", "Former smoker"],
    predictions: [
      { id: "PRD-004", disease: "CKD", risk: 45, confidence: 89.5, date: "2026-06-28" },
      { id: "PRD-005", disease: "Stroke", risk: 38, confidence: 88.2, date: "2026-06-20" },
    ],
    timeline: [
      { date: "2026-06-28", event: "CKD risk flagged — high priority" },
      { date: "2026-06-20", event: "Stroke risk assessment" },
    ],
    reports: [
      { id: "RPT-2026-0628", title: "CKD Risk Report", date: "2026-06-28", status: "Pending" },
    ],
    metrics: [
      { label: "BP", value: "148/92", trend: "up" },
      { label: "Glucose", value: "156 mg/dL", trend: "up" },
      { label: "BMI", value: "31.2", trend: "up" },
      { label: "HR", value: "82 bpm", trend: "up" },
    ],
    latestPrediction: {
      disease: "Chronic Kidney Disease",
      risk: 45,
      confidence: 89.5,
      factors: [
        { factor: "Blood Pressure", contribution: 24 },
        { factor: "Glucose Control", contribution: 20 },
        { factor: "BMI", contribution: 16 },
        { factor: "Smoking History", contribution: 12 },
      ],
      recommendations: [
        "Urgent nephrology referral",
        "Tighten glycemic control protocol",
        "BP monitoring twice daily",
      ],
    },
    latestReport: {
      id: "RPT-2026-0628",
      summary: "Elevated CKD risk — immediate intervention recommended.",
      healthScore: 62,
      riskCategory: "High",
    },
    notes: [
      { id: "N3", date: "2026-06-28", author: "Dr. Mitchell", text: "Referred to nephrology. Follow-up in 2 weeks." },
    ],
  },
];

export const appointments = [
  { id: "APT-001", patient: "John Doe", patientId: "PT-10294", date: "2026-07-03T09:00:00", type: "Follow-up", status: "upcoming" },
  { id: "APT-002", patient: "Emily Carter", patientId: "PT-10312", date: "2026-07-03T10:30:00", type: "Wellness Check", status: "upcoming" },
  { id: "APT-003", patient: "Robert Kim", patientId: "PT-10401", date: "2026-07-03T14:00:00", type: "High Risk Review", status: "upcoming" },
  { id: "APT-004", patient: "John Doe", patientId: "PT-10294", date: "2026-06-28T11:00:00", type: "Consultation", status: "completed" },
  { id: "APT-005", patient: "Lisa Wong", patientId: "PT-10455", date: "2026-06-25T15:00:00", type: "Initial Visit", status: "cancelled" },
];

export const notifications = [
  { id: "N1", type: "prediction", title: "New Prediction", message: "John Doe — Diabetes risk assessment completed", time: "2026-07-02T10:30:00", read: false },
  { id: "N2", type: "alert", title: "High Risk Alert", message: "Robert Kim — CKD risk elevated to 45%", time: "2026-06-28T16:00:00", read: false },
  { id: "N3", type: "appointment", title: "Appointment Reminder", message: "Follow-up with John Doe at 9:00 AM today", time: "2026-07-03T07:00:00", read: true },
  { id: "N4", type: "report", title: "New Report", message: "Hypertension report ready for Emily Carter", time: "2026-06-30T14:20:00", read: true },
];

export const analyticsData = {
  patientGrowth: [
    { month: "Jan", patients: 180 },
    { month: "Feb", patients: 195 },
    { month: "Mar", patients: 210 },
    { month: "Apr", patients: 225 },
    { month: "May", patients: 236 },
    { month: "Jun", patients: 248 },
  ],
  diseaseDistribution: [
    { disease: "Diabetes", count: 68 },
    { disease: "Hypertension", count: 54 },
    { disease: "Heart Disease", count: 32 },
    { disease: "CKD", count: 18 },
    { disease: "Stroke", count: 14 },
    { disease: "Liver", count: 9 },
  ],
  predictionAccuracy: [
    { month: "Jan", accuracy: 91.2 },
    { month: "Feb", accuracy: 92.5 },
    { month: "Mar", accuracy: 93.1 },
    { month: "Apr", accuracy: 94.0 },
    { month: "May", accuracy: 94.8 },
    { month: "Jun", accuracy: 95.2 },
  ],
  consultationTrends: [
    { week: "W1", consultations: 42 },
    { week: "W2", consultations: 48 },
    { week: "W3", consultations: 45 },
    { week: "W4", consultations: 52 },
  ],
};

export const riskFilterOptions = [
  { value: "all", label: "All Risk Levels" },
  { value: "High", label: "High Risk" },
  { value: "Moderate", label: "Moderate Risk" },
  { value: "Low", label: "Low Risk" },
];

export const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "risk", label: "Risk (High First)" },
  { value: "recent", label: "Recent Visit" },
];
