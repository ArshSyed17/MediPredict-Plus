const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Info', 'Alert', 'Success', 'Warning'],
    default: 'Info',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String, // Optional URL to redirect to when clicked
  }
}, {
  timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
