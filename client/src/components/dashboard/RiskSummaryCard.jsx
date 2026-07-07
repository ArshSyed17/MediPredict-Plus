import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, TrendingDown } from 'lucide-react';

const RiskSummaryCard = () => {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    setRisks([
      { disease: 'Diabetes', risk: 15, color: 'from-green-500 to-emerald-500', status: 'Low' },
      { disease: 'Heart Disease', risk: 28, color: 'from-yellow-500 to-orange-500', status: 'Moderate' },
      { disease: 'Stroke', risk: 12, color: 'from-green-500 to-emerald-500', status: 'Low' },
      { disease: 'Kidney Disease', risk: 8, color: 'from-green-500 to-emerald-500', status: 'Low' },
    ]);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Disease Risk Summary</h3>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-teal-400" />
          <span className="text-teal-400 text-sm font-medium">AI Predicted</span>
        </div>
      </div>

      <div className="space-y-4">
        {risks.map((risk, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-medium text-sm">{risk.disease}</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${
                  risk.risk < 20 ? 'text-green-400' : risk.risk < 40 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {risk.risk}%
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  risk.risk < 20 ? 'bg-green-500/20 text-green-400' : risk.risk < 40 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {risk.status}
                </span>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${risk.risk}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={`h-full bg-gradient-to-r ${risk.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 flex items-center gap-3"
      >
        <TrendingDown className="w-4 h-4 text-teal-400" />
        <p className="text-teal-400 text-xs">
          Overall risk decreased by 8% compared to last month
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RiskSummaryCard;
