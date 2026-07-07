export const defaultProfile = {
  id: "PT-10294",
  avatarUrl: "",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 234-7890",
  dateOfBirth: "1984-03-15",
  age: 42,
  gender: "Male",
  height: 172,
  weight: 78,
  bloodGroup: "O+",
  address: "124 Wellness Ave, San Francisco, CA 94102",
  medicalConditions: ["Mild Hypertension", "Prediabetes (managed)"],
  allergies: ["Penicillin", "Shellfish"],
  medications: ["Metformin 500mg", "Lisinopril 10mg"],
  lifestyle: {
    activityLevel: "Moderately Active",
    diet: "Mediterranean",
    smoking: "None",
    alcohol: "Occasional",
    sleepHours: 6.8,
    dailySteps: 6800,
  },
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
    email: "jane.doe@email.com",
  },
  insurance: {
    provider: "BlueCross Health Plus",
    policyNumber: "BCH-8849201",
    groupNumber: "GRP-4421",
    validUntil: "2027-01-01",
  },
};

export const achievements = [
  { id: "a1", title: "First Prediction", description: "Completed your first AI disease prediction", icon: "target", earnedAt: "2026-01-12" },
  { id: "a2", title: "7-Day Streak", description: "Logged health data for 7 consecutive days", icon: "flame", earnedAt: "2026-02-03" },
  { id: "a3", title: "Risk Reducer", description: "Lowered diabetes risk by 8% through simulation", icon: "trending", earnedAt: "2026-03-18" },
  { id: "a4", title: "Report Pro", description: "Generated 5 AI medical reports", icon: "file", earnedAt: "2026-04-22" },
];

export const healthJourney = [
  { id: "j1", date: "2026-01-10", title: "Joined MediPredict+", type: "milestone" },
  { id: "j2", date: "2026-02-14", title: "First Diabetes Risk Assessment", type: "prediction" },
  { id: "j3", date: "2026-03-05", title: "Completed Lifestyle Simulation", type: "simulation" },
  { id: "j4", date: "2026-04-01", title: "Health Score improved to 76", type: "improvement" },
  { id: "j5", date: "2026-06-22", title: "Hypertension Report Generated", type: "report" },
];
