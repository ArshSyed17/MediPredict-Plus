const { body } = require('express-validator');

exports.doctorProfileValidation = [
  body('specialization').optional().isString().withMessage('Specialization must be a string'),
  body('experienceYears').optional().isNumeric().withMessage('Experience years must be a number'),
  body('consultationFee').optional().isNumeric().withMessage('Consultation fee must be a number'),
  body('qualifications').optional().isArray().withMessage('Qualifications must be an array'),
  body('workingHours').optional().isArray().withMessage('Working hours must be an array'),
];
