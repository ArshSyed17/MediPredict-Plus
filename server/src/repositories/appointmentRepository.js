const Appointment = require('../models/Appointment');

class AppointmentRepository {
  async create(appointmentData) {
    return await Appointment.create(appointmentData);
  }

  async findById(id) {
    return await Appointment.findById(id).populate('patient').populate('doctor');
  }

  async findByPatientId(patientId) {
    return await Appointment.find({ patient: patientId }).populate('doctor').sort({ date: 1 });
  }

  async findByDoctorId(doctorId) {
    return await Appointment.find({ doctor: doctorId }).populate('patient').sort({ date: 1 });
  }

  async checkOverlap(doctorId, date, timeSlot) {
    return await Appointment.findOne({ doctor: doctorId, date, timeSlot, status: 'Scheduled' });
  }

  async updateById(id, updateData) {
    return await Appointment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async findAll(query = {}) {
    return await Appointment.find(query).populate('patient').populate('doctor').sort({ date: 1 });
  }
}

module.exports = new AppointmentRepository();
