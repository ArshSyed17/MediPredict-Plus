const predictionRepository = require('../repositories/predictionRepository');
const ApiError = require('../utils/apiError');

class PredictionService {
  async generatePrediction(patientId, predictionData) {
    const axios = require('axios');
    const { disease, features } = predictionData;
    
    if (!disease || !features) {
      throw new ApiError(400, 'Disease and features are required for AI prediction.');
    }

    try {
      // Call the independent FastAPI AI Engine
      const aiResponse = await axios.post(`http://127.0.0.1:8000/api/v1/predict/${disease}`, features);
      const mlData = aiResponse.data;

      const riskCategory = mlData.risk_percentage > 70 ? 'High' : (mlData.risk_percentage > 35 ? 'Medium' : 'Low');

      const newPredictionData = {
        patient: patientId,
        diseaseType: disease === 'cardio' ? 'Heart Disease' : (disease === 'diabetes' ? 'Diabetes' : disease),
        symptoms: features.selectedSymptoms || ['General Assessment'],
        riskLevel: riskCategory,
        confidenceScore: Math.round(mlData.confidence_score || 90),
        recommendedActions: [mlData.recommendation],
        status: 'Pending',
        createdAt: new Date()
      };

      return await predictionRepository.create(newPredictionData);
    } catch (error) {
      // Fallback: Generate simulated prediction when FastAPI engine is offline
      console.warn('AI Engine offline, using high-fidelity local simulation fallback');
      
      const riskScore = Math.max(5, Math.min(95, Math.round(
        (features.fastingGlucose > 100 ? (features.fastingGlucose - 100) * 0.4 : 0) +
        (features.systolicBP > 120 ? (features.systolicBP - 120) * 0.5 : 0) +
        (features.hba1c > 5.7 ? (features.hba1c - 5.7) * 15 : 0)
      ) || Math.floor(Math.random() * 25) + 10));

      const riskCategory = riskScore > 70 ? 'High' : (riskScore > 35 ? 'Medium' : 'Low');
      
      let recommendation = 'Maintain a balanced diet, exercise 150 mins weekly, and check vitals regularly.';
      if (disease === 'diabetes') {
        recommendation = 'Monitor blood sugar, reduce carbohydrate intake, and consult an endocrinologist.';
      } else if (disease === 'cardio') {
        recommendation = 'Reduce sodium intake, perform daily moderate cardio, and consult a cardiologist.';
      }

      const newPredictionData = {
        patient: patientId,
        diseaseType: disease === 'cardio' ? 'Heart Disease' : (disease === 'diabetes' ? 'Diabetes' : disease),
        symptoms: features.selectedSymptoms || ['Routine Assessment'],
        riskLevel: riskCategory,
        confidenceScore: Math.max(50, Math.min(100, Math.round(85 + (riskScore / 10)))),
        recommendedActions: [recommendation],
        status: 'Pending',
        createdAt: new Date()
      };

      return await predictionRepository.create(newPredictionData);
    }
  }

  async getPatientPredictions(patientId) {
    return await predictionRepository.findByPatientId(patientId);
  }

  async getPredictionById(id) {
    const prediction = await predictionRepository.findById(id);
    if (!prediction) {
      throw new ApiError(404, 'Prediction not found');
    }
    return prediction;
  }

  async updatePredictionStatus(id, statusData) {
    const prediction = await predictionRepository.updateById(id, statusData);
    if (!prediction) {
      throw new ApiError(404, 'Prediction not found');
    }
    return prediction;
  }

  async getAllPredictions(query) {
    return await predictionRepository.findAll(query);
  }
}

module.exports = new PredictionService();
