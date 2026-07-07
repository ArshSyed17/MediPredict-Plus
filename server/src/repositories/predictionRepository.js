const Prediction = require('../models/Prediction');

class PredictionRepository {
  async create(predictionData) {
    return await Prediction.create(predictionData);
  }

  async findById(id) {
    return await Prediction.findById(id).populate('patient');
  }

  async findByPatientId(patientId) {
    return await Prediction.find({ patient: patientId }).sort({ createdAt: -1 });
  }

  async updateById(id, updateData) {
    return await Prediction.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async findAll(query = {}) {
    return await Prediction.find(query).populate('patient').sort({ createdAt: -1 });
  }
}

module.exports = new PredictionRepository();
