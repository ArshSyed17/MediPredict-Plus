const patientRepository = require('../repositories/patientRepository');
const ApiError = require('../utils/apiError');

class PatientService {
  async createPatientProfile(userId, patientData) {
    const existingPatient = await patientRepository.findByUserId(userId);
    if (existingPatient) {
      throw new ApiError(400, 'Patient profile already exists for this user');
    }
    
    patientData.user = userId;
    return await patientRepository.create(patientData);
  }

  async getPatientProfile(userId) {
    const patient = await patientRepository.findByUserId(userId);
    if (!patient) {
      throw new ApiError(404, 'Patient profile not found');
    }
    return patient;
  }

  async updatePatientProfile(userId, updateData) {
    const patient = await patientRepository.updateByUserId(userId, updateData);
    if (!patient) {
      throw new ApiError(404, 'Patient profile not found');
    }
    return patient;
  }
  
  async getPatientById(patientId) {
    const patient = await patientRepository.findById(patientId);
    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }
    return patient;
  }

  async getAllPatients(query) {
    return await patientRepository.findAll(query);
  }
}

module.exports = new PatientService();
