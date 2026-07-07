const express = require('express');
const reportController = require('../controllers/reportController');
const { uploadReportValidation } = require('../validators/reportValidator');
const validate = require('../middlewares/validate');
const { protect, restrictTo } = require('../middlewares/auth');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Apply protect middleware to all report routes
router.use(protect);

/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Upload a new medical report
 *     tags: [Medical Reports]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/', 
  restrictTo('patient', 'doctor', 'admin'), 
  upload.single('file'), 
  async (req, res, next) => {
    try {
      const Patient = require('../models/Patient');
      const reportService = require('../services/reportService');
      const ApiResponse = require('../utils/apiResponse');

      // Auto-resolve patientId from auth token
      let patient = await Patient.findOne({ user: req.user._id });
      if (!patient) {
        patient = await Patient.create({ user: req.user._id });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded. Please select a file.' });
      }
      if (!req.body.reportType) {
        return res.status(400).json({ message: 'Report type is required.' });
      }

      const report = await reportService.uploadReport(patient._id, req.file, req.body);
      res.status(201).json(new ApiResponse(201, 'Medical report uploaded successfully', report));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /reports/me:
 *   get:
 *     summary: Get all reports for the currently logged-in user
 *     tags: [Medical Reports]
 *     security:
 *       - bearerAuth: []
 */
router.get('/me', async (req, res, next) => {
  try {
    const Patient = require('../models/Patient');
    const MedicalReport = require('../models/MedicalReport');
    const ApiResponse = require('../utils/apiResponse');
    
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) return res.status(200).json(new ApiResponse(200, 'No reports found', []));
    
    const reports = await MedicalReport.find({ patient: patient._id }).sort({ createdAt: -1 }).lean();
    res.status(200).json(new ApiResponse(200, 'Reports retrieved successfully', reports));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Get all reports (Admin only)
 *     tags: [Medical Reports]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', restrictTo('admin'), reportController.getAllReports);

/**
 * @swagger
 * /reports/patient/{patientId}:
 *   get:
 *     summary: Get all reports for a specific patient
 *     tags: [Medical Reports]
 *     security:
 *       - bearerAuth: []
 */
router.get('/patient/:patientId', restrictTo('patient', 'doctor', 'admin'), reportController.getPatientReports);

/**
 * @swagger
 * /reports/{id}:
 *   get:
 *     summary: Get a specific medical report
 *     tags: [Medical Reports]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', restrictTo('patient', 'doctor', 'admin'), reportController.getReportById);

/**
 * @swagger
 * /reports/{id}:
 *   delete:
 *     summary: Delete a specific medical report
 *     tags: [Medical Reports]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', restrictTo('patient', 'admin'), reportController.deleteReport);

module.exports = router;
