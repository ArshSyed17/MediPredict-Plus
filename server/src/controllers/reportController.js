const reportService = require('../services/reportService');
const ApiResponse = require('../utils/apiResponse');

exports.uploadReport = async (req, res, next) => {
  try {
    const report = await reportService.uploadReport(req.body.patientId, req.file, req.body);
    res.status(201).json(new ApiResponse(201, 'Medical report uploaded and processed successfully', report));
  } catch (error) {
    next(error);
  }
};

exports.getPatientReports = async (req, res, next) => {
  try {
    const reports = await reportService.getPatientReports(req.params.patientId);
    res.status(200).json(new ApiResponse(200, 'Reports retrieved successfully', reports));
  } catch (error) {
    next(error);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const report = await reportService.getReportById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Report retrieved successfully', report));
  } catch (error) {
    next(error);
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    await reportService.deleteReport(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Report deleted successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getAllReports = async (req, res, next) => {
  try {
    const reports = await reportService.getAllReports(req.query);
    res.status(200).json(new ApiResponse(200, 'All reports retrieved successfully', reports));
  } catch (error) {
    next(error);
  }
};
