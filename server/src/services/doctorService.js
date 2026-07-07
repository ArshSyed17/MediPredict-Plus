const doctorRepository = require('../repositories/doctorRepository');
const ApiError = require('../utils/apiError');

class DoctorService {
  async createDoctorProfile(userId, doctorData) {
    const existingDoctor = await doctorRepository.findByUserId(userId);
    if (existingDoctor) {
      throw new ApiError(400, 'Doctor profile already exists for this user');
    }
    
    doctorData.user = userId;
    return await doctorRepository.create(doctorData);
  }

  async getDoctorProfile(userId) {
    const doctor = await doctorRepository.findByUserId(userId);
    if (!doctor) {
      throw new ApiError(404, 'Doctor profile not found');
    }
    return doctor;
  }

  async updateDoctorProfile(userId, updateData) {
    const doctor = await doctorRepository.updateByUserId(userId, updateData);
    if (!doctor) {
      throw new ApiError(404, 'Doctor profile not found');
    }
    return doctor;
  }
  
  async getDoctorById(doctorId) {
    const doctor = await doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new ApiError(404, 'Doctor not found');
    }
    return doctor;
  }

  async getAllDoctors(query) {
    return await doctorRepository.findAll(query);
  }
}

module.exports = new DoctorService();
