const express = require('express');
const predictionController = require('../controllers/predictionController');
const { createPredictionValidation, updatePredictionValidation } = require('../validators/predictionValidator');
const validate = require('../middlewares/validate');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Apply protect middleware to all prediction routes
router.use(protect);

/**
 * @swagger
 * /predictions:
 *   post:
 *     summary: Generate a new prediction
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 */
/**
 * Dedicated /run endpoint — auto-resolves the patient from the logged-in user.
 * The frontend sends { disease, features } without a patientId.
 */
router.post('/run', restrictTo('patient', 'doctor', 'admin'), async (req, res, next) => {
  try {
    const Patient = require('../models/Patient');
    let patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      patient = await Patient.create({ user: req.user._id });
    }
    const predictionService = require('../services/predictionService');
    const ApiResponse = require('../utils/apiResponse');
    const prediction = await predictionService.generatePrediction(patient._id, req.body);
    res.status(201).json(new ApiResponse(201, 'Prediction generated successfully', prediction));
  } catch (err) {
    next(err);
  }
});

/**
 * GET /predictions/mine — returns all predictions belonging to the logged-in user's patient record
 */
router.get('/mine', async (req, res, next) => {
  try {
    const Patient = require('../models/Patient');
    const Prediction = require('../models/Prediction');
    const ApiResponse = require('../utils/apiResponse');
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      return res.status(200).json(new ApiResponse(200, 'No predictions yet', []));
    }
    const predictions = await Prediction.find({ patient: patient._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
    res.status(200).json(new ApiResponse(200, 'Predictions fetched successfully', predictions));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /predictions:
 *   post:
 *     summary: Generate a new prediction
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', restrictTo('patient', 'doctor', 'admin'), createPredictionValidation, validate, predictionController.createPrediction);

/**
 * @swagger
 * /predictions:
 *   get:
 *     summary: Get all predictions (Admin only)
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', restrictTo('admin'), predictionController.getAllPredictions);

/**
 * @swagger
 * /predictions/patient/{patientId}:
 *   get:
 *     summary: Get predictions for a specific patient
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 */
router.get('/patient/:patientId', restrictTo('patient', 'doctor', 'admin'), predictionController.getPatientPredictions);

/**
 * @swagger
 * /predictions/{id}:
 *   get:
 *     summary: Get prediction by ID
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', restrictTo('patient', 'doctor', 'admin'), predictionController.getPredictionById);

/**
 * @swagger
 * /predictions/{id}:
 *   patch:
 *     summary: Update prediction status/notes
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id', restrictTo('doctor', 'admin'), updatePredictionValidation, validate, predictionController.updatePredictionStatus);

module.exports = router;
