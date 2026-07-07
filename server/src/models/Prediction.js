const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  diseaseType: {
    type: String,
    required: true,
  },
  symptoms: [{
    type: String,
    required: true
  }],
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    required: true
  },
  confidenceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  recommendedActions: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Resolved'],
    default: 'Pending'
  },
  doctorNotes: {
    type: String
  }
}, {
  timestamps: true
});

const Prediction = mongoose.model('Prediction', predictionSchema);
module.exports = Prediction;
