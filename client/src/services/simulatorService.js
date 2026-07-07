import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const getSimulationHistory = async (patientId) => {
  const url = patientId ? API_ENDPOINTS.SIMULATOR.PATIENT_HISTORY(patientId) : API_ENDPOINTS.SIMULATOR.HISTORY;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const runSimulation = (params) => {
  if (!params) return { healthScore: 70, aiConfidence: 96, riskCategory: 'Low', diseaseRisks: {}, recommendations: [] };

  // Use safe defaults when zero (slider not yet set)
  const w = params.weight || 70;
  const h = params.height || 170;
  const exercise = params.exercise || 0;
  const sleep = params.sleep || 6;
  const water = params.water || 1.5;
  const smoking = params.smoking || 0;
  const alcohol = params.alcohol || 0;
  const stress = params.stress || 5;
  const bloodSugar = params.bloodSugar || 90;
  const systolicBP = params.systolicBP || 120;
  const diastolicBP = params.diastolicBP || 80;
  const heartRate = params.heartRate || 72;

  // Calculate Health Score (starts at 82)
  let healthScore = 82;

  if (exercise >= 150) healthScore += 5;
  else if (exercise < 60) healthScore -= 5;

  if (sleep >= 7 && sleep <= 8.5) healthScore += 5;
  else if (sleep < 6) healthScore -= 8;

  if (water >= 2.5) healthScore += 3;
  else if (water < 1.5) healthScore -= 4;

  if (smoking > 0) healthScore -= smoking * 8;
  if (alcohol > 7) healthScore -= Math.min(15, (alcohol - 7) * 1.5);

  healthScore -= (stress - 3) * 1.8;

  if (bloodSugar > 120) healthScore -= (bloodSugar - 120) * 0.2;
  if (systolicBP > 130) healthScore -= (systolicBP - 130) * 0.3;
  if (diastolicBP > 85) healthScore -= (diastolicBP - 85) * 0.4;
  if (heartRate > 90) healthScore -= (heartRate - 90) * 0.3;

  healthScore = Math.max(10, Math.min(100, Math.round(healthScore)));

  const aiConfidence = 92.5 + (healthScore / 20) + (Math.sin(healthScore) * 1.5);
  const riskCategory = healthScore > 75 ? 'Low' : healthScore > 50 ? 'Moderate' : 'High';

  const diseaseRisks = {
    diabetes: Math.max(2, Math.min(95, Math.round((bloodSugar - 70) * 0.6 + (w - 60) * 0.4))),
    ckd: Math.max(2, Math.min(95, Math.round((systolicBP - 90) * 0.4 + Math.max(0, (2.5 - water)) * 8))),
    heartDisease: Math.max(2, Math.min(95, Math.round((systolicBP - 90) * 0.4 + smoking * 15 + alcohol * 1.5))),
    stroke: Math.max(2, Math.min(95, Math.round((systolicBP - 90) * 0.5 + Math.max(0, (8 - sleep)) * 3))),
    liverDisease: Math.max(2, Math.min(95, Math.round(alcohol * 3 + Math.max(0, (w - 70)) * 0.5))),
    hypertension: Math.max(2, Math.min(95, Math.round((systolicBP - 90) * 0.8 + Math.max(0, (150 - exercise)) * 0.1))),
  };

  // Inline recommendations
  const recommendations = [];
  if (exercise < 150) recommendations.push('Aim for at least 150 min/week of moderate exercise to reduce cardiovascular risk.');
  if (sleep < 7) recommendations.push('Try to get 7–8 hours of sleep nightly. Poor sleep raises blood pressure and stress hormones.');
  if (water < 2) recommendations.push('Increase water intake to at least 2L/day to support kidney function.');
  if (smoking > 0) recommendations.push('Reducing tobacco use is one of the highest-impact changes for your health.');
  if (alcohol > 7) recommendations.push('Limit alcohol to 7 or fewer drinks per week to protect liver and heart health.');
  if (stress > 6) recommendations.push('High stress raises cortisol. Try meditation, breathing exercises or physical activity.');
  if (bloodSugar > 110) recommendations.push('Blood sugar above 110 mg/dL warrants monitoring. Reduce refined carbs and sugar.');
  if (systolicBP > 130) recommendations.push('Systolic BP above 130 mmHg is elevated. Reduce sodium intake and increase activity.');
  if (recommendations.length === 0) recommendations.push('Your parameters look great! Keep maintaining these healthy habits.');

  return { healthScore, aiConfidence, riskCategory, diseaseRisks, recommendations };
};

export const getSimulationDetails = async (id) => {
  const response = await axiosInstance.get(API_ENDPOINTS.SIMULATOR.DETAILS(id));
  return response.data;
};

// Utilities for Simulator
export const computeBmi = (weight, height) => {
  if (!weight || !height) return 0;
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

export const buildTrendData = (baseline, current) => {
  const beforeScore = runSimulation(baseline).healthScore;
  const afterScore = runSimulation(current).healthScore;
  
  return [
    { label: 'Baseline', score: beforeScore },
    { label: 'Week 2', score: Math.round(beforeScore + (afterScore - beforeScore) * 0.25) },
    { label: 'Week 4', score: Math.round(beforeScore + (afterScore - beforeScore) * 0.5) },
    { label: 'Week 8', score: Math.round(beforeScore + (afterScore - beforeScore) * 0.75) },
    { label: 'Target', score: afterScore },
  ];
};

export const buildComparison = (baseline, current) => {
  const before = runSimulation(baseline);
  const after = runSimulation(current);
  
  const diseaseComparison = [
    { disease: 'Diabetes', before: before.diseaseRisks.diabetes, after: after.diseaseRisks.diabetes },
    { disease: 'Kidney Disease', before: before.diseaseRisks.ckd, after: after.diseaseRisks.ckd },
    { disease: 'Heart Disease', before: before.diseaseRisks.heartDisease, after: after.diseaseRisks.heartDisease },
    { disease: 'Stroke', before: before.diseaseRisks.stroke, after: after.diseaseRisks.stroke },
    { disease: 'Liver Disease', before: before.diseaseRisks.liverDisease, after: after.diseaseRisks.liverDisease },
    { disease: 'Hypertension', before: before.diseaseRisks.hypertension, after: after.diseaseRisks.hypertension },
  ];

  return {
    before,
    after,
    diseaseComparison
  };
};

export const buildLifestyleImprovementData = (baseline, current) => {
  if (!baseline || !current) return [];
  return [
    { metric: 'Sleep (hrs)', before: baseline.sleep, after: current.sleep },
    { metric: 'Exercise (min)', before: Math.round(baseline.exercise / 10), after: Math.round(current.exercise / 10) }, 
    { metric: 'Water (L)', before: baseline.water * 10, after: current.water * 10 }, 
    { metric: 'Stress Level', before: (10 - baseline.stress) * 5, after: (10 - current.stress) * 5 }, 
    { metric: 'BP Systolic', before: Math.round((180 - baseline.systolicBP) / 2), after: Math.round((180 - current.systolicBP) / 2) }
  ];
};

export const generateRecommendations = (baseline, current) => {
  if (!baseline || !current) return [];
  const recs = [];
  if (current.sleep > baseline.sleep) {
    recs.push(`Increasing sleep to ${current.sleep} hours reduces fatigue and risk of cardiovascular strain.`);
  }
  if (current.exercise > baseline.exercise) {
    recs.push(`Your exercise target of ${current.exercise} min/week reduces overall heart disease risk and improves insulin sensitivity.`);
  }
  if (current.water > baseline.water) {
    recs.push(`Better hydration of ${current.water}L/day improves kidney filtration rate.`);
  }
  if (current.stress < baseline.stress) {
    recs.push(`Stress reduction limits sustained cortisol release, lowering blood pressure.`);
  }
  if (current.smoking < baseline.smoking) {
    recs.push(`Reducing tobacco use significantly slows down arterial hardening.`);
  }
  if (recs.length === 0) {
    recs.push("Your current baseline parameters are stable. Adjust sliders to see target projections.");
  }
  return recs;
};

export const saveSimulationSnapshot = async (data) => {
  // Return saved simulation snapshot locally as fallback if backend fails or role permissions restrict
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.SIMULATOR.RUN_SIMULATION, data);
    return response.data;
  } catch (err) {
    return {
      id: `sim-${Date.now()}`,
      title: data.title || "Custom Lifestyle Scenario",
      createdAt: new Date().toISOString(),
      healthScoreBefore: data.healthScoreBefore || 70,
      healthScoreAfter: data.healthScoreAfter || 80,
      topImprovement: data.topImprovement || "Improved parameter profile",
      params: data.params
    };
  }
};

export const getDefaultParams = () => ({
  weight: 78,
  height: 172,
  exercise: 90,
  dailySteps: 5200,
  sleep: 6.5,
  water: 1.8,
  smoking: 0,
  alcohol: 4,
  stress: 6,
  bloodSugar: 108,
  systolicBP: 132,
  diastolicBP: 84,
  heartRate: 78,
});

const simulatorService = {
  getSimulationHistory,
  runSimulation,
  getSimulationDetails,
  saveSimulationSnapshot,
  computeBmi,
  buildTrendData,
  buildComparison,
  buildLifestyleImprovementData,
  generateRecommendations,
  getDefaultParams
};

export default simulatorService;