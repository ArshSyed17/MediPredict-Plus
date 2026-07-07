import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Eye } from 'lucide-react';

const RecentReports = () => {
  const navigate = useNavigate();
  const reports = [
    { name: 'Blood Work Results', date: 'Jun 28, 2026', type: 'Lab Report' },
    { name: 'Cardiac Screening', date: 'Jun 15, 2026', type: 'Imaging' },
    { name: 'Annual Physical', date: 'May 20, 2026', type: 'Checkup' },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Recent Reports</h3>
        <FileText className="w-5 h-5 text-teal-400" />
      </div>

      <div className="space-y-3">
        {reports.map((report, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="p-3 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/20 rounded-lg">
                  <FileText className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{report.name}</h4>
                  <p className="text-gray-400 text-xs">{report.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/reports')}
        className="w-full mt-4 py-3 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl text-teal-400 font-medium hover:from-teal-500/30 hover:to-emerald-500/30 transition-all duration-200 border border-teal-500/30"
      >
        View All Reports
      </motion.button>
    </motion.div>
  );
};

export default RecentReports;
