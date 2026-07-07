const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    prediction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prediction',
    },
    reportType: {
      type: String,
      enum: ['AI_Medical_Report', 'Health_Summary', 'Risk_Assessment'],
      default: 'AI_Medical_Report',
    },
    healthData: {
      age: Number,
      gender: String,
      bmi: Number,
      bloodPressure: String,
      bloodSugar: Number,
      hba1c: Number,
      cholesterol: Number,
    },
    reportContent: {
      summary: String,
      keyFindings: [String],
      riskFactors: [String],
      recommendations: [String],
      lifestyleAdvice: [String],
      followUpActions: [String],
    },
    aiAnalysis: {
      confidence: Number,
      processingTime: Number,
      modelVersion: String,
    },
    doctorReview: {
      reviewed: {
        type: Boolean,
        default: false,
      },
      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      reviewedAt: Date,
      notes: String,
    },
    status: {
      type: String,
      enum: ['generating', 'completed', 'archived', 'deleted'],
      default: 'completed',
    },
    downloadUrl: String,
    fileUrl: String,
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
reportSchema.index({ user: 1, createdAt: -1 });
reportSchema.index({ createdAt: -1 });
reportSchema.index({ status: 1 });
reportSchema.index({ isArchived: 1 });
reportSchema.index({ prediction: 1 });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
