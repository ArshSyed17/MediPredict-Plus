const { body } = require('express-validator');

exports.updateProfileValidation = [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty').trim(),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty').trim(),
  body('email').optional().isEmail().withMessage('Must be a valid email').normalizeEmail(),
];

exports.updatePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),
];
