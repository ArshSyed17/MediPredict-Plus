const mongoose = require('mongoose');

const simulationSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  simulationType: {
    type: String,
    enum: ['Weight Loss', 'Blood Pressure', 'Diabetes Risk', 'Heart Disease Risk', 'General Fitness', 'Diabetes', 'CKD', 'Heart Disease', 'Stroke', 'Liver Disease', 'Hypertension'],
    required: true,
  },
  currentMetrics: {
    type: Object,
    required: true,
  },
  targetMetrics: {
    type: Object,
    required: true,
  },
  simulatedOutcome: {
    projectedTimeframeDays: Number,
    riskReductionPercentage: Number,
    feasibilityScore: Number, // 0 to 100
  },
  recommendedPlan: [{
    phase: String,
    action: String,
    duration: String,
  }],
}, {
  timestamps: true
});

const SimulationHistory = mongoose.model('SimulationHistory', simulationSchema);
module.exports = SimulationHistory;
