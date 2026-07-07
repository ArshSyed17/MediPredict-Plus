const patientService = require('../services/patientService');
const ApiResponse = require('../utils/apiResponse');

exports.createProfile = async (req, res, next) => {
  try {
    const patient = await patientService.createPatientProfile(req.user._id, req.body);
    res.status(201).json(new ApiResponse(201, 'Patient profile created successfully', patient));
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientProfile(req.user._id);
    res.status(200).json(new ApiResponse(200, 'Patient profile retrieved', patient));
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const patient = await patientService.updatePatientProfile(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, 'Patient profile updated successfully', patient));
  } catch (error) {
    next(error);
  }
};

exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Patient retrieved', patient));
  } catch (error) {
    next(error);
  }
};

exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await patientService.getAllPatients(req.query);
    res.status(200).json(new ApiResponse(200, 'Patients retrieved successfully', patients));
  } catch (error) {
    next(error);
  }
};
