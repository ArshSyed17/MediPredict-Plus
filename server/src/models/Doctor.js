const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  experienceYears: {
    type: Number,
    required: true,
    default: 0
  },
  clinicAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  consultationFee: {
    type: Number,
    required: true,
    default: 0
  },
  workingHours: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    startTime: String, // e.g. "09:00"
    endTime: String    // e.g. "17:00"
  }],
  about: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
