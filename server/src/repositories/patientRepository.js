const Patient = require('../models/Patient');

class PatientRepository {
  async create(patientData) {
    return await Patient.create(patientData);
  }

  async findByUserId(userId) {
    return await Patient.findOne({ user: userId }).populate('user', 'firstName lastName email avatar');
  }

  async findById(id) {
    return await Patient.findById(id).populate('user', 'firstName lastName email avatar');
  }

  async updateByUserId(userId, updateData) {
    return await Patient.findOneAndUpdate({ user: userId }, updateData, {
      new: true,
      runValidators: true,
    }).populate('user', 'firstName lastName email avatar');
  }

  async findAll(query = {}) {
    return await Patient.find(query).populate('user', 'firstName lastName email avatar');
  }
}

module.exports = new PatientRepository();
