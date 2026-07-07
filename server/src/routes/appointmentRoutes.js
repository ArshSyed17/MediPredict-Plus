const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const { bookAppointmentValidation, updateAppointmentValidation } = require('../validators/appointmentValidator');
const validate = require('../middlewares/validate');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Apply protect middleware to all appointment routes
router.use(protect);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', restrictTo('patient', 'admin'), bookAppointmentValidation, validate, appointmentController.bookAppointment);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments (Admin only)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', restrictTo('admin'), appointmentController.getAllAppointments);

/**
 * @swagger
 * /appointments/patient/{patientId}:
 *   get:
 *     summary: Get appointments for a specific patient
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 */
router.get('/patient/:patientId', restrictTo('patient', 'admin', 'doctor'), appointmentController.getPatientAppointments);

/**
 * @swagger
 * /appointments/doctor/{doctorId}:
 *   get:
 *     summary: Get appointments for a specific doctor
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 */
router.get('/doctor/:doctorId', restrictTo('doctor', 'admin'), appointmentController.getDoctorAppointments);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', restrictTo('patient', 'doctor', 'admin'), appointmentController.getAppointmentById);

/**
 * @swagger
 * /appointments/{id}:
 *   patch:
 *     summary: Update appointment status or notes
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id', restrictTo('doctor', 'admin', 'patient'), updateAppointmentValidation, validate, appointmentController.updateAppointmentStatus);

module.exports = router;
