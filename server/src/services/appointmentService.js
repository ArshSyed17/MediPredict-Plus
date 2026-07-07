const appointmentRepository = require('../repositories/appointmentRepository');
const ApiError = require('../utils/apiError');
const crypto = require('crypto');

class AppointmentService {
  async bookAppointment(patientId, appointmentData) {
    const { doctorId, date, timeSlot, reason } = appointmentData;

    // Check for overlaps
    const existing = await appointmentRepository.checkOverlap(doctorId, date, timeSlot);
    if (existing) {
      throw new ApiError(400, 'This time slot is already booked for this doctor');
    }

    // Generate mock meeting link for telemedicine
    const meetingLink = `https://medipredict.live/meet/${crypto.randomBytes(8).toString('hex')}`;

    const newAppointment = {
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot,
      reason,
      meetingLink,
      status: 'Scheduled'
    };

    return await appointmentRepository.create(newAppointment);
  }

  async getPatientAppointments(patientId) {
    return await appointmentRepository.findByPatientId(patientId);
  }

  async getDoctorAppointments(doctorId) {
    return await appointmentRepository.findByDoctorId(doctorId);
  }

  async getAppointmentById(id) {
    const appointment = await appointmentRepository.findById(id);
    if (!appointment) {
      throw new ApiError(404, 'Appointment not found');
    }
    return appointment;
  }

  async updateAppointmentStatus(id, statusData) {
    const appointment = await appointmentRepository.updateById(id, statusData);
    if (!appointment) {
      throw new ApiError(404, 'Appointment not found');
    }
    return appointment;
  }

  async getAllAppointments(query) {
    return await appointmentRepository.findAll(query);
  }
}

module.exports = new AppointmentService();
