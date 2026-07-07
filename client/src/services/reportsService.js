import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const fetchReports = async () => {
  try {
    const response = await axiosInstance.get('/reports/me');
    const data = response.data || response;
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Failed to fetch reports:', err);
    return [];
  }
};

export const fetchPatientReports = async (patientId) => {
  const response = await axiosInstance.get(API_ENDPOINTS.REPORTS.PATIENT_REPORTS(patientId));
  return response.data;
};

export const filterReports = (reports, { search, disease, dateFrom, sort }) => {
  let filtered = [...reports];
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (report) =>
        report.id?.toLowerCase().includes(query) ||
        report.reportType?.toLowerCase().includes(query) ||
        report.fileName?.toLowerCase().includes(query)
    );
  }
  if (disease && disease !== "all") {
    filtered = filtered.filter((report) => report.reportType === disease);
  }
  if (dateFrom) {
    const from = new Date(dateFrom).getTime();
    filtered = filtered.filter((report) => new Date(report.reportDate || report.createdAt).getTime() >= from);
  }
  filtered.sort((a, b) => {
    const aTime = new Date(a.reportDate || a.createdAt).getTime();
    const bTime = new Date(b.reportDate || b.createdAt).getTime();
    return sort === "oldest" ? aTime - bTime : bTime - aTime;
  });
  return filtered;
};

export const uploadReport = async (formData) => {
  // formData should contain the file and other fields
  const response = await axiosInstance.post(API_ENDPOINTS.REPORTS.UPLOAD, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteReport = async (reportId) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.REPORTS.DETAILS(reportId));
  return response;
};

export const downloadReportPdf = async (report) => {
  if (report.fileUrl) {
    const link = document.createElement("a");
    const url = report.fileUrl.startsWith('http') ? report.fileUrl : `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${report.fileUrl}`;
    link.href = url;
    link.download = report.fileName || 'Report.pdf';
    link.click();
    return { success: true };
  }
  return { success: false, error: 'No file URL provided' };
};

export const toggleFavoriteReport = async (reportId) => {
  return await axiosInstance.patch(`${API_ENDPOINTS.REPORTS.DETAILS(reportId)}/favorite`);
};

export const shareReport = async (report) => {
  const shareUrl = `${window.location.origin}/reports?report=${report.id}`;
  if (navigator.share) {
    await navigator.share({ title: `Report ${report.id}`, url: shareUrl });
    return { success: true, method: "native" };
  }
  await navigator.clipboard.writeText(shareUrl);
  return { success: true, method: "clipboard" };
};

export const printReport = (reportId) => {
  window.print();
  return { success: true, reportId };
};

const reportsService = {
  fetchReports,
  fetchPatientReports,
  filterReports,
  uploadReport,
  deleteReport,
  downloadReportPdf,
  toggleFavoriteReport,
  shareReport,
  printReport,
};

export default reportsService;
