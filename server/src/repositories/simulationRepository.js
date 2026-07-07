const SimulationHistory = require('../models/SimulationHistory');

class SimulationRepository {
  async create(simulationData) {
    return await SimulationHistory.create(simulationData);
  }

  async findByPatientId(patientId) {
    return await SimulationHistory.find({ patient: patientId }).sort({ createdAt: -1 });
  }

  async findById(id) {
    return await SimulationHistory.findById(id).populate('patient');
  }

  async findAll(query = {}) {
    return await SimulationHistory.find(query).populate('patient').sort({ createdAt: -1 });
  }
}

module.exports = new SimulationRepository();
