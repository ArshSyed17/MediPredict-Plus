const { body } = require('express-validator');

exports.bookAppointmentValidation = [
  body('patientId').notEmpty().withMessage('Patient ID is required').isMongoId().withMessage('Invalid Patient ID'),
  body('doctorId').notEmpty().withMessage('Doctor ID is required').isMongoId().withMessage('Invalid Doctor ID'),
  body('date').notEmpty().withMessage('Date is required').isISO8601().withMessage('Valid date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('reason').notEmpty().withMessage('Reason is required'),
];

exports.updateAppointmentValidation = [
  body('status').optional().isIn(['Scheduled', 'Completed', 'Cancelled']).withMessage('Invalid status'),
  body('notes').optional().isString()
];
