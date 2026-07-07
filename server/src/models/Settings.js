const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      predictionAlerts: {
        type: Boolean,
        default: true,
      },
      reportUpdates: {
        type: Boolean,
        default: true,
      },
      appointmentReminders: {
        type: Boolean,
        default: true,
      },
      marketing: {
        type: Boolean,
        default: false,
      },
    },
    privacy: {
      shareDataWithDoctors: {
        type: Boolean,
        default: true,
      },
      allowAnalytics: {
        type: Boolean,
        default: true,
      },
      publicProfile: {
        type: Boolean,
        default: false,
      },
    },
    preferences: {
      language: {
        type: String,
        default: 'en',
      },
      timezone: {
        type: String,
        default: 'UTC',
      },
      dateFormat: {
        type: String,
        default: 'MM/DD/YYYY',
      },
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'auto',
      },
    },
    connectedDevices: [
      {
        deviceId: String,
        deviceName: String,
        deviceType: String,
        lastConnected: Date,
        connected: Boolean,
      },
    ],
    security: {
      twoFactorEnabled: {
        type: Boolean,
        default: false,
      },
      lastPasswordChange: Date,
      loginAlerts: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
settingsSchema.index({ user: 1 });

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
