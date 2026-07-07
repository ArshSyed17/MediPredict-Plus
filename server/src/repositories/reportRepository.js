const MedicalReport = require('../models/MedicalReport');

class ReportRepository {
  async create(reportData) {
    return await MedicalReport.create(reportData);
  }

  async findByPatientId(patientId) {
    return await MedicalReport.find({ patient: patientId }).populate('doctor', 'user').sort({ reportDate: -1 });
  }

  async findById(id) {
    return await MedicalReport.findById(id).populate('patient').populate('doctor');
  }

  async deleteById(id) {
    return await MedicalReport.findByIdAndDelete(id);
  }

  async findAll(query = {}) {
    return await MedicalReport.find(query).populate('patient').populate('doctor').sort({ reportDate: -1 });
  }
}

module.exports = new ReportRepository();
