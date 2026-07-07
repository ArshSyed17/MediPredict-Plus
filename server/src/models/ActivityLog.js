const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: [
      'LOGIN', 'LOGOUT', 'PASSWORD_RESET', 'PROFILE_UPDATE', 
      'PREDICTION_RUN', 'SIMULATION_RUN', 'REPORT_UPLOAD', 
      'APPOINTMENT_BOOKED', 'SYSTEM_ALERT'
    ],
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  metadata: {
    type: Object, // Additional contextual data
    default: {}
  }
}, {
  timestamps: true
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
module.exports = ActivityLog;
