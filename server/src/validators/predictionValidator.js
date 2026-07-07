const { body } = require('express-validator');

exports.createPredictionValidation = [
  body('patientId').notEmpty().withMessage('Patient ID is required').isMongoId().withMessage('Invalid Patient ID'),
  body('diseaseType').notEmpty().withMessage('Disease type is required'),
  body('symptoms').isArray({ min: 1 }).withMessage('At least one symptom is required'),
];

exports.updatePredictionValidation = [
  body('status').optional().isIn(['Pending', 'Reviewed', 'Resolved']).withMessage('Invalid status'),
  body('doctorNotes').optional().isString()
];
