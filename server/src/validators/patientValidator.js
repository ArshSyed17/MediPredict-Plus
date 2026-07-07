const { body } = require('express-validator');

exports.patientProfileValidation = [
  body('personalInfo.dateOfBirth').optional().isISO8601().withMessage('Valid date of birth is required'),
  body('personalInfo.gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('personalInfo.bloodGroup').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Invalid blood group'),
  body('personalInfo.phoneNumber').optional().isString(),
  
  body('lifestyleInfo.smoking').optional().isIn(['never', 'former', 'current']),
  body('lifestyleInfo.alcoholConsumption').optional().isIn(['none', 'occasional', 'moderate', 'heavy']),
  body('lifestyleInfo.exerciseFrequency').optional().isIn(['never', 'rarely', 'weekly', 'daily']),
  
  body('healthMetrics.height').optional().isNumeric(),
  body('healthMetrics.weight').optional().isNumeric(),
];
