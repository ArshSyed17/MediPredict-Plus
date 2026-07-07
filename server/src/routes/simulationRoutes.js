const express = require('express');
const simulationController = require('../controllers/simulationController');
const { runSimulationValidation } = require('../validators/simulationValidator');
const validate = require('../middlewares/validate');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Apply protect middleware to all simulation routes
router.use(protect);

/**
 * @swagger
 * /simulations:
 *   post:
 *     summary: Run a new health simulation
 *     tags: [Simulations]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', restrictTo('patient', 'doctor', 'admin'), async (req, res, next) => {
  try {
    const Patient = require('../models/Patient');
    const ApiResponse = require('../utils/apiResponse');
    const simulationService = require('../services/simulationService');

    // Auto-resolve patient from auth token — create one if it doesn't exist yet
    let patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      patient = await Patient.create({ user: req.user._id });
    }
    const simulation = await simulationService.runSimulation(patient._id, req.body);
    res.status(201).json(new ApiResponse(201, 'Health simulation generated successfully', simulation));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /simulations/mine:
 *   get:
 *     summary: Get all simulations for the currently logged-in user
 *     tags: [Simulations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/mine', async (req, res, next) => {
  try {
    const SimulationHistory = require('../models/SimulationHistory');
    const Patient = require('../models/Patient');
    const ApiResponse = require('../utils/apiResponse');
    // Find the patient profile linked to this user
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) return res.status(200).json(new ApiResponse(200, 'No simulations found', []));
    const simulations = await SimulationHistory.find({ patient: patient._id }).sort({ createdAt: -1 }).lean();
    res.status(200).json(new ApiResponse(200, 'Simulations retrieved', simulations));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /simulations:
 *   get:
 *     summary: Get all simulations (Admin only)
 *     tags: [Simulations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', restrictTo('admin'), simulationController.getAllSimulations);

/**
 * @swagger
 * /simulations/patient/{patientId}:
 *   get:
 *     summary: Get simulations for a specific patient
 *     tags: [Simulations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/patient/:patientId', restrictTo('patient', 'doctor', 'admin'), simulationController.getPatientSimulations);

/**
 * @swagger
 * /simulations/{id}:
 *   get:
 *     summary: Get simulation by ID
 *     tags: [Simulations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', restrictTo('patient', 'doctor', 'admin'), simulationController.getSimulationById);

module.exports = router;
