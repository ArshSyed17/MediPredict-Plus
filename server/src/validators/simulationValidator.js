const { body } = require('express-validator');

exports.runSimulationValidation = [
  body('patientId').notEmpty().withMessage('Patient ID is required').isMongoId().withMessage('Invalid Patient ID'),
  body('simulationType').isIn(['Weight Loss', 'Blood Pressure', 'Diabetes Risk', 'Heart Disease Risk', 'General Fitness']).withMessage('Invalid simulation type'),
  body('currentMetrics').isObject().withMessage('Current metrics must be an object'),
  body('targetMetrics').isObject().withMessage('Target metrics must be an object'),
];
