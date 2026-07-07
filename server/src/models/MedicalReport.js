const mongoose = require('mongoose');

const medicalReportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  reportType: {
    type: String,
    enum: ['Blood Test', 'X-Ray', 'MRI', 'CT Scan', 'General Consultation', 'Other'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  extractedData: {
    type: Object, // Key-value pairs extracted by AI
    default: {}
  },
  aiSummary: {
    type: String,
  },
  reportDate: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

const MedicalReport = mongoose.model('MedicalReport', medicalReportSchema);
module.exports = MedicalReport;
