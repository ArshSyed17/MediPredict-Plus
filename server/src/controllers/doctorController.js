const doctorService = require('../services/doctorService');
const ApiResponse = require('../utils/apiResponse');

exports.createProfile = async (req, res, next) => {
  try {
    const doctor = await doctorService.createDoctorProfile(req.user._id, req.body);
    res.status(201).json(new ApiResponse(201, 'Doctor profile created successfully', doctor));
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorProfile(req.user._id);
    res.status(200).json(new ApiResponse(200, 'Doctor profile retrieved', doctor));
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const doctor = await doctorService.updateDoctorProfile(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, 'Doctor profile updated successfully', doctor));
  } catch (error) {
    next(error);
  }
};

exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Doctor retrieved', doctor));
  } catch (error) {
    next(error);
  }
};

exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorService.getAllDoctors(req.query);
    res.status(200).json(new ApiResponse(200, 'Doctors retrieved successfully', doctors));
  } catch (error) {
    next(error);
  }
};
