const simulationRepository = require('../repositories/simulationRepository');
const ApiError = require('../utils/apiError');

class SimulationService {
  async runSimulation(patientId, simulationData) {
    const { simulationType, currentMetrics, targetMetrics } = simulationData;

    // Simulate AI calculation for projected health outcomes based on targets
    const feasibilityScore = Math.floor(Math.random() * 40) + 60; // 60 to 100
    const riskReductionPercentage = Math.floor(Math.random() * 30) + 10; // 10% to 40%
    const projectedTimeframeDays = Math.floor(Math.random() * 180) + 30; // 30 to 210 days

    let recommendedPlan = [];
    
    if (simulationType === 'Weight Loss') {
      recommendedPlan = [
        { phase: 'Weeks 1-4', action: 'Caloric deficit of 500 kcal/day, 3 days cardio', duration: '30 days' },
        { phase: 'Weeks 5-12', action: 'Increase protein intake, 4 days strength training', duration: '60 days' },
      ];
    } else if (simulationType === 'Blood Pressure') {
      recommendedPlan = [
        { phase: 'Phase 1', action: 'DASH diet implementation, reduce sodium to <1500mg', duration: '14 days' },
        { phase: 'Phase 2', action: 'Daily 30 min brisk walking, stress management', duration: '30 days' }
      ];
    } else {
      recommendedPlan = [
        { phase: 'Initial', action: 'Consult primary care physician for a detailed plan', duration: '7 days' },
        { phase: 'Ongoing', action: 'Maintain healthy lifestyle and monitor metrics weekly', duration: '90 days' }
      ];
    }

    const outcomeData = {
      patient: patientId,
      simulationType,
      currentMetrics,
      targetMetrics,
      simulatedOutcome: {
        projectedTimeframeDays,
        riskReductionPercentage,
        feasibilityScore
      },
      recommendedPlan
    };

    return await simulationRepository.create(outcomeData);
  }

  async getPatientSimulations(patientId) {
    return await simulationRepository.findByPatientId(patientId);
  }

  async getSimulationById(id) {
    const simulation = await simulationRepository.findById(id);
    if (!simulation) {
      throw new ApiError(404, 'Simulation record not found');
    }
    return simulation;
  }

  async getAllSimulations(query) {
    return await simulationRepository.findAll(query);
  }
}

module.exports = new SimulationService();
