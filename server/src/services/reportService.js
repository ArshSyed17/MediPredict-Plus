const reportRepository = require('../repositories/reportRepository');
const ApiError = require('../utils/apiError');

class ReportService {
  async uploadReport(patientId, file, reportData) {
    if (!file) {
      throw new ApiError(400, 'No report file provided');
    }

    // In a production environment, this is where you'd upload 'file.path' to Cloudinary or AWS S3
    // For now, we use the local path
    const fileUrl = `/uploads/${file.filename}`;

    // Simulate AI Data Extraction and Summarization
    const aiSummary = `This is an AI-generated summary for the ${reportData.reportType}. The results indicate parameters within normal ranges, though slight elevation in specific biomarkers suggests routine monitoring.`;
    
    const extractedData = {
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      notes: 'Extracted automatically via OCR.'
    };

    const newReport = {
      patient: patientId,
      reportType: reportData.reportType,
      fileUrl,
      fileName: file.originalname,
      aiSummary,
      extractedData,
      reportDate: reportData.reportDate || Date.now(),
      doctor: reportData.doctorId || undefined
    };

    return await reportRepository.create(newReport);
  }

  async getPatientReports(patientId) {
    return await reportRepository.findByPatientId(patientId);
  }

  async getReportById(id) {
    const report = await reportRepository.findById(id);
    if (!report) {
      throw new ApiError(404, 'Report not found');
    }
    return report;
  }

  async deleteReport(id) {
    const report = await reportRepository.deleteById(id);
    if (!report) {
      throw new ApiError(404, 'Report not found');
    }
    return true;
  }

  async getAllReports(query) {
    return await reportRepository.findAll(query);
  }
}

module.exports = new ReportService();
