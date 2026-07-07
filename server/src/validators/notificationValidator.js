const { body } = require('express-validator');

exports.createNotificationValidation = [
  body('user').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID'),
  body('title').notEmpty().withMessage('Title is required'),
  body('message').notEmpty().withMessage('Message is required'),
  body('type').optional().isIn(['Info', 'Alert', 'Success', 'Warning']).withMessage('Invalid type'),
];
