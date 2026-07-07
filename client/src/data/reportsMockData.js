export const diseaseFilterOptions = [
  { value: "all", label: "All Diseases" },
  { value: "diabetes", label: "Diabetes" },
  { value: "hypertension", label: "Hypertension" },
  { value: "heartDisease", label: "Heart Disease" },
  { value: "stroke", label: "Stroke" },
  { value: "ckd", label: "CKD" },
  { value: "liverDisease", label: "Liver Disease" },
];

export const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

const buildTimeline = (baseDate) => [
  { id: "tl-1", label: "Prediction Created", date: baseDate, status: "completed" },
  { id: "tl-2", label: "Simulation Completed", date: shiftDate(baseDate, 1), status: "completed" },
  { id: "tl-3", label: "Report Generated", date: shiftDate(baseDate, 2), status: "completed" },
  { id: "tl-4", label: "Doctor Review", date: shiftDate(baseDate, 3), status: "completed" },
  { id: "tl-5", label: "Lifestyle Updated", date: shiftDate(baseDate, 5), status: "pending" },
];

function shiftDate(iso, hours) {
  const date = new Date(iso);
  date.setHours(date.getHours() + hours);
  return date.toISOString();
}

export const mockReports = [
  {
    id: "RPT-2026-0841",
    createdAt: "2026-07-02T10:30:00.000Z",
    disease: "Type 2 Diabetes",
    diseaseId: "diabetes",
    favorite: true,
    patient: {
      name: "John Doe",
      age: 42,
      gender: "Male",
      patientId: "PT-10294",
      email: "john.doe@email.com",
    },
    summary:
      "Moderate diabetes risk detected with strong glycemic and lifestyle contributors. Intervention plan recommended within 30 days.",
    healthScore: 76,
    aiConfidence: 94.2,
    riskCategory: "Moderate",
    diseaseRisks: {
      diabetes: 28,
      hypertension: 34,
      heartDisease: 22,
      stroke: 18,
      ckd: 16,
      liverDisease: 14,
    },
    vitals: {
      systolicBP: 128,
      diastolicBP: 82,
      heartRate: 74,
      bloodSugar: 108,
      bmi: 26.4,
    },
    lifestyle: {
      exercise: 120,
      dailySteps: 6800,
      sleep: 6.8,
      water: 2.1,
      smoking: "Occasional",
      alcohol: "Light",
      stress: 5,
    },
    healthMetrics: [
      { label: "HbA1c", value: "5.9%", status: "borderline" },
      { label: "LDL", value: "112 mg/dL", status: "normal" },
      { label: "Creatinine", value: "1.0 mg/dL", status: "normal" },
      { label: "Resting HR", value: "74 bpm", status: "normal" },
    ],
    medicalHistory: [
      "Family history of Type 2 Diabetes",
      "Mild hypertension (managed)",
      "No prior cardiac events",
    ],
    recommendations: [
      "Increase daily steps to 8,000+",
      "Adopt low-glycemic meal planning",
      "Schedule fasting glucose test in 4 weeks",
      "Reduce refined sugar intake",
    ],
    doctorNotes:
      "Patient profile indicates reversible risk factors. Recommend nutrition counseling and follow-up in 6 weeks.",
    trends: {
      healthScore: [
        { label: "Jan", score: 68 },
        { label: "Feb", score: 71 },
        { label: "Mar", score: 73 },
        { label: "Apr", score: 76 },
      ],
      diseaseRisk: [
        { label: "Jan", diabetes: 36, hypertension: 40 },
        { label: "Feb", diabetes: 33, hypertension: 38 },
        { label: "Mar", diabetes: 30, hypertension: 36 },
        { label: "Apr", diabetes: 28, hypertension: 34 },
      ],
      vitals: [
        { label: "Week 1", bloodSugar: 118, systolicBP: 134 },
        { label: "Week 2", bloodSugar: 112, systolicBP: 131 },
        { label: "Week 3", bloodSugar: 110, systolicBP: 129 },
        { label: "Week 4", bloodSugar: 108, systolicBP: 128 },
      ],
    },
    predictionComparison: {
      before: { healthScore: 68, diabetesRisk: 36, hypertensionRisk: 40 },
      after: { healthScore: 76, diabetesRisk: 28, hypertensionRisk: 34 },
    },
    timeline: buildTimeline("2026-07-02T08:00:00.000Z"),
  },
  {
    id: "RPT-2026-0722",
    createdAt: "2026-06-22T14:15:00.000Z",
    disease: "Hypertension",
    diseaseId: "hypertension",
    favorite: false,
    patient: {
      name: "John Doe",
      age: 42,
      gender: "Male",
      patientId: "PT-10294",
      email: "john.doe@email.com",
    },
    summary:
      "Elevated blood pressure patterns observed. Stress and sodium sensitivity are primary contributors.",
    healthScore: 71,
    aiConfidence: 91.8,
    riskCategory: "Moderate",
    diseaseRisks: {
      diabetes: 24,
      hypertension: 42,
      heartDisease: 26,
      stroke: 21,
      ckd: 19,
      liverDisease: 12,
    },
    vitals: {
      systolicBP: 136,
      diastolicBP: 88,
      heartRate: 78,
      bloodSugar: 102,
      bmi: 27.1,
    },
    lifestyle: {
      exercise: 90,
      dailySteps: 5400,
      sleep: 6.2,
      water: 1.7,
      smoking: "None",
      alcohol: "Moderate",
      stress: 7,
    },
    healthMetrics: [
      { label: "HbA1c", value: "5.6%", status: "normal" },
      { label: "LDL", value: "118 mg/dL", status: "borderline" },
      { label: "Creatinine", value: "1.1 mg/dL", status: "normal" },
      { label: "Resting HR", value: "78 bpm", status: "borderline" },
    ],
    medicalHistory: [
      "Work-related stress episodes",
      "Borderline cholesterol",
      "No kidney disease history",
    ],
    recommendations: [
      "Practice daily 10-minute breathing exercises",
      "Limit sodium to under 2,300 mg/day",
      "Monitor blood pressure twice daily",
      "Increase hydration to 2.5L/day",
    ],
    doctorNotes:
      "Consider ambulatory BP monitoring. Lifestyle adjustments should be prioritized before medication escalation.",
    trends: {
      healthScore: [
        { label: "Jan", score: 64 },
        { label: "Feb", score: 66 },
        { label: "Mar", score: 69 },
        { label: "Apr", score: 71 },
      ],
      diseaseRisk: [
        { label: "Jan", diabetes: 28, hypertension: 48 },
        { label: "Feb", diabetes: 27, hypertension: 46 },
        { label: "Mar", diabetes: 25, hypertension: 44 },
        { label: "Apr", diabetes: 24, hypertension: 42 },
      ],
      vitals: [
        { label: "Week 1", bloodSugar: 106, systolicBP: 142 },
        { label: "Week 2", bloodSugar: 104, systolicBP: 139 },
        { label: "Week 3", bloodSugar: 103, systolicBP: 137 },
        { label: "Week 4", bloodSugar: 102, systolicBP: 136 },
      ],
    },
    predictionComparison: {
      before: { healthScore: 64, diabetesRisk: 28, hypertensionRisk: 48 },
      after: { healthScore: 71, diabetesRisk: 24, hypertensionRisk: 42 },
    },
    timeline: buildTimeline("2026-06-22T12:00:00.000Z"),
  },
  {
    id: "RPT-2026-0610",
    createdAt: "2026-06-10T09:45:00.000Z",
    disease: "Heart Disease",
    diseaseId: "heartDisease",
    favorite: false,
    patient: {
      name: "John Doe",
      age: 42,
      gender: "Male",
      patientId: "PT-10294",
      email: "john.doe@email.com",
    },
    summary:
      "Low-to-moderate cardiovascular risk with improving trajectory after lifestyle simulation adjustments.",
    healthScore: 79,
    aiConfidence: 93.5,
    riskCategory: "Low",
    diseaseRisks: {
      diabetes: 20,
      hypertension: 30,
      heartDisease: 18,
      stroke: 15,
      ckd: 12,
      liverDisease: 10,
    },
    vitals: {
      systolicBP: 122,
      diastolicBP: 78,
      heartRate: 70,
      bloodSugar: 96,
      bmi: 25.2,
    },
    lifestyle: {
      exercise: 180,
      dailySteps: 9200,
      sleep: 7.5,
      water: 2.8,
      smoking: "None",
      alcohol: "Light",
      stress: 4,
    },
    healthMetrics: [
      { label: "HbA1c", value: "5.4%", status: "normal" },
      { label: "LDL", value: "98 mg/dL", status: "normal" },
      { label: "Creatinine", value: "0.9 mg/dL", status: "normal" },
      { label: "Resting HR", value: "70 bpm", status: "normal" },
    ],
    medicalHistory: [
      "No prior cardiac events",
      "Occasional elevated LDL in past reports",
      "Active lifestyle maintained",
    ],
    recommendations: [
      "Continue 150+ minutes weekly cardio",
      "Maintain Mediterranean-style diet",
      "Annual lipid panel recommended",
      "Keep stress management routine",
    ],
    doctorNotes:
      "Favorable trend. Reinforce current exercise and nutrition plan. Next review in 3 months.",
    trends: {
      healthScore: [
        { label: "Jan", score: 72 },
        { label: "Feb", score: 74 },
        { label: "Mar", score: 77 },
        { label: "Apr", score: 79 },
      ],
      diseaseRisk: [
        { label: "Jan", diabetes: 24, hypertension: 36 },
        { label: "Feb", diabetes: 22, hypertension: 34 },
        { label: "Mar", diabetes: 21, hypertension: 32 },
        { label: "Apr", diabetes: 20, hypertension: 30 },
      ],
      vitals: [
        { label: "Week 1", bloodSugar: 100, systolicBP: 128 },
        { label: "Week 2", bloodSugar: 98, systolicBP: 125 },
        { label: "Week 3", bloodSugar: 97, systolicBP: 123 },
        { label: "Week 4", bloodSugar: 96, systolicBP: 122 },
      ],
    },
    predictionComparison: {
      before: { healthScore: 72, diabetesRisk: 24, hypertensionRisk: 36 },
      after: { healthScore: 79, diabetesRisk: 20, hypertensionRisk: 30 },
    },
    timeline: buildTimeline("2026-06-10T07:30:00.000Z"),
  },
];
