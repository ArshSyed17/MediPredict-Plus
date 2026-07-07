const { body } = require('express-validator');

exports.uploadReportValidation = [
  body('patientId').notEmpty().withMessage('Patient ID is required').isMongoId().withMessage('Invalid Patient ID'),
  body('reportType').isIn(['Blood Test', 'X-Ray', 'MRI', 'CT Scan', 'General Consultation', 'Other']).withMessage('Invalid report type'),
  body('doctorId').optional().isMongoId().withMessage('Invalid Doctor ID'),
];
