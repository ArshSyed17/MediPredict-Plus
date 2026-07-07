const simulationService = require('../services/simulationService');
const ApiResponse = require('../utils/apiResponse');

exports.runSimulation = async (req, res, next) => {
  try {
    const simulation = await simulationService.runSimulation(req.body.patientId, req.body);
    res.status(201).json(new ApiResponse(201, 'Health simulation generated successfully', simulation));
  } catch (error) {
    next(error);
  }
};

exports.getPatientSimulations = async (req, res, next) => {
  try {
    const simulations = await simulationService.getPatientSimulations(req.params.patientId);
    res.status(200).json(new ApiResponse(200, 'Simulations retrieved', simulations));
  } catch (error) {
    next(error);
  }
};

exports.getSimulationById = async (req, res, next) => {
  try {
    const simulation = await simulationService.getSimulationById(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Simulation retrieved', simulation));
  } catch (error) {
    next(error);
  }
};

exports.getAllSimulations = async (req, res, next) => {
  try {
    const simulations = await simulationService.getAllSimulations(req.query);
    res.status(200).json(new ApiResponse(200, 'All simulations retrieved', simulations));
  } catch (error) {
    next(error);
  }
};
