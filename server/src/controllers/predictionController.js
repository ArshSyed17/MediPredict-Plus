const predictionService = require('../services/predictionService');
const ApiResponse = require('../utils/apiResponse');

exports.createPrediction = async (req, res, next) => {
  try {
    const prediction = await predictionService.generatePrediction(req.body.patientId, req.body);
    res.status(201).json(new ApiResponse(201, 'Prediction generated successfully', prediction));
  } catch (error) {
    next(error);
  }
};

exports.getPatientPredictions = async (req, res, next) => {
  try {
    const predictions = await predictionService.getPatientPredictions(req.params.patientId);
    res.status(200).json(new ApiResponse(200, 'Predictions retrieved', predictions));
  } catch (error) {
    next(error);
  }
};

exports.getPredictionById = async (req, res, next) => {
  try {
    const prediction = await predictionService.getPredictionById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Prediction retrieved', prediction));
  } catch (error) {
    next(error);
  }
};

exports.updatePredictionStatus = async (req, res, next) => {
  try {
    const prediction = await predictionService.updatePredictionStatus(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, 'Prediction updated', prediction));
  } catch (error) {
    next(error);
  }
};

exports.getAllPredictions = async (req, res, next) => {
  try {
    const predictions = await predictionService.getAllPredictions(req.query);
    res.status(200).json(new ApiResponse(200, 'All predictions retrieved', predictions));
  } catch (error) {
    next(error);
  }
};
