const Doctor = require('../models/Doctor');

class DoctorRepository {
  async create(doctorData) {
    return await Doctor.create(doctorData);
  }

  async findByUserId(userId) {
    return await Doctor.findOne({ user: userId }).populate('user', 'firstName lastName email avatar');
  }

  async findById(id) {
    return await Doctor.findById(id).populate('user', 'firstName lastName email avatar');
  }

  async updateByUserId(userId, updateData) {
    return await Doctor.findOneAndUpdate({ user: userId }, updateData, {
      new: true,
      runValidators: true,
    }).populate('user', 'firstName lastName email avatar');
  }

  async findAll(query = {}) {
    return await Doctor.find(query).populate('user', 'firstName lastName email avatar');
  }
}

module.exports = new DoctorRepository();
