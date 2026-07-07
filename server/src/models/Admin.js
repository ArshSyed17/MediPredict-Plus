const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: String,
        enum: [
          'user_management',
          'doctor_management',
          'patient_management',
          'report_management',
          'system_settings',
          'audit_logs',
          'analytics',
          'notifications',
          'backup_restore',
          'api_management',
        ],
      },
    ],
    department: {
      type: String,
      enum: ['Super_Admin', 'Operations', 'Technical', 'Support'],
      default: 'Operations',
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    loginHistory: [
      {
        timestamp: Date,
        ipAddress: String,
        userAgent: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
adminSchema.index({ user: 1 });
adminSchema.index({ department: 1 });
adminSchema.index({ isActive: 1 });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
