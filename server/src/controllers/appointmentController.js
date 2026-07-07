const appointmentService = require('../services/appointmentService');
const ApiResponse = require('../utils/apiResponse');

exports.bookAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.bookAppointment(req.body.patientId, req.body);
    res.status(201).json(new ApiResponse(201, 'Appointment booked successfully', appointment));
  } catch (error) {
    next(error);
  }
};

exports.getPatientAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getPatientAppointments(req.params.patientId);
    res.status(200).json(new ApiResponse(200, 'Patient appointments retrieved', appointments));
  } catch (error) {
    next(error);
  }
};

exports.getDoctorAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getDoctorAppointments(req.params.doctorId);
    res.status(200).json(new ApiResponse(200, 'Doctor appointments retrieved', appointments));
  } catch (error) {
    next(error);
  }
};

exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Appointment retrieved', appointment));
  } catch (error) {
    next(error);
  }
};

exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const appointment = await appointmentService.updateAppointmentStatus(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, 'Appointment status updated', appointment));
  } catch (error) {
    next(error);
  }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getAllAppointments(req.query);
    res.status(200).json(new ApiResponse(200, 'All appointments retrieved', appointments));
  } catch (error) {
    next(error);
  }
};
