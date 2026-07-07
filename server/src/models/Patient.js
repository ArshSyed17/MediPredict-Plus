const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personalInfo: {
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    phoneNumber: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  medicalHistory: {
    allergies: [{ type: String }],
    chronicConditions: [{ type: String }],
    pastSurgeries: [{ type: String }],
    familyHistory: [{ type: String }]
  },
  lifestyleInfo: {
    smoking: { type: String, enum: ['never', 'former', 'current'] },
    alcoholConsumption: { type: String, enum: ['none', 'occasional', 'moderate', 'heavy'] },
    exerciseFrequency: { type: String, enum: ['never', 'rarely', 'weekly', 'daily'] },
    dietaryPreferences: [{ type: String }]
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String
  },
  insurance: {
    provider: String,
    policyNumber: String,
    groupNumber: String
  },
  healthMetrics: {
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    heartRate: Number
  }
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
