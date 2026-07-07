const express = require('express');
const patientController = require('../controllers/patientController');
const { patientProfileValidation } = require('../validators/patientValidator');
const validate = require('../middlewares/validate');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Apply protect middleware to all routes below
router.use(protect);

/**
 * @swagger
 * /patients/profile:
 *   post:
 *     summary: Create patient profile
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 */
router.post('/profile', restrictTo('patient'), patientProfileValidation, validate, patientController.createProfile);

/**
 * @swagger
 * /patients/profile:
 *   get:
 *     summary: Get current patient profile
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 */
router.get('/profile', restrictTo('patient'), patientController.getProfile);

/**
 * @swagger
 * /patients/profile:
 *   put:
 *     summary: Update patient profile
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 */
router.put('/profile', restrictTo('patient'), patientProfileValidation, validate, patientController.updateProfile);

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients (Doctor & Admin only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', restrictTo('doctor', 'admin'), patientController.getAllPatients);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get specific patient by ID (Doctor & Admin only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', restrictTo('doctor', 'admin'), patientController.getPatientById);

module.exports = router;
