const express = require('express');
const doctorController = require('../controllers/doctorController');
const { doctorProfileValidation } = require('../validators/doctorValidator');
const validate = require('../middlewares/validate');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all verified doctors (Public or Any authenticated user)
 *     tags: [Doctors]
 */
router.get('/', protect, doctorController.getAllDoctors);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get specific doctor details
 *     tags: [Doctors]
 */
router.get('/:id', protect, doctorController.getDoctorById);

// Apply protect middleware to all profile routes below
router.use(protect);

/**
 * @swagger
 * /doctors/profile:
 *   post:
 *     summary: Create doctor profile
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 */
router.post('/profile', restrictTo('doctor'), doctorProfileValidation, validate, doctorController.createProfile);

/**
 * @swagger
 * /doctors/profile:
 *   get:
 *     summary: Get current doctor profile
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 */
router.get('/profile', restrictTo('doctor'), doctorController.getProfile);

/**
 * @swagger
 * /doctors/profile:
 *   put:
 *     summary: Update doctor profile
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 */
router.put('/profile', restrictTo('doctor'), doctorProfileValidation, validate, doctorController.updateProfile);

module.exports = router;
