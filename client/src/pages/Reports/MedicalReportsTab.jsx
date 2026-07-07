import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Download, Trash2, ShieldAlert } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const MedicalReportsTab = () => {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [reportType, setReportType] = useState('Blood Test');

  const reportTypes = ['Blood Test', 'X-Ray', 'MRI', 'CT Scan', 'General Consultation', 'Other'];

  const fetchReports = async () => {
    try {
      const res = await axiosInstance.get('/reports/me');
      const data = res.data?.data || res.data;
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch reports', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return error('Please select a file to upload');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('reportType', reportType);
    formData.append('patientId', user?._id || user?.id);

    setUploading(true);
    try {
      await axiosInstance.post('/reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      success('Report uploaded successfully');
      setFile(null);
      fetchReports();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to upload report');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    try {
      await axiosInstance.delete(`/reports/${id}`);
      success('Report deleted successfully');
      setReports(reports.filter((r) => r._id !== id));
    } catch (err) {
      error('Failed to delete report');
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-6">
      {/* Report List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-teal-400/50 text-center py-12">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <FileText className="w-12 h-12 text-teal-500/40 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">No Medical Reports</h3>
            <p className="text-gray-400 text-sm">You haven't uploaded any medical reports yet.</p>
          </div>
        ) : (
          reports.map((report) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={report._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold">{report.reportType}</h4>
                <p className="text-xs text-gray-400">
                  Uploaded on {new Date(report.createdAt || report.reportDate).toLocaleDateString()}
                </p>
                {report.analysisStatus === 'completed' && (
                  <span className="inline-block mt-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    AI Analyzed
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {report.fileUrl && (
                  <a
                    href={`${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '') : 'http://localhost:5000'}${report.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-teal-400 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => handleDelete(report._id)}
                  className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Upload Form */}
      <aside>
        <form onSubmit={handleUpload} className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-2xl p-6 sticky top-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Upload className="w-4 h-4 text-teal-400" />
            Upload New Report
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-teal-500"
              >
                {reportTypes.map((t) => (
                  <option key={t} value={t} className="bg-slate-900">{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">File (PDF/Image)</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-teal-500/20 file:text-teal-400 hover:file:bg-teal-500/30 transition-all cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-teal-500/30 transition-all disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Report'}
            </button>
          </div>
          
          <div className="mt-5 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-2 text-xs text-amber-200">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            Your medical records are encrypted and stored securely.
          </div>
        </form>
      </aside>
    </div>
  );
};

export default MedicalReportsTab;
