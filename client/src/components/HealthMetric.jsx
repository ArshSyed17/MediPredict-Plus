import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';

const HealthMetric = ({ label, value, icon: Icon, color, bgColor, textColor, size = 'normal' }) => {
  const sizeClasses = size === 'large' ? 'text-4xl' : 'text-3xl';
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`p-4 ${bgColor} rounded-2xl border border-white/10 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`${textColor} text-lg`} />
        <span className="text-gray-300 text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className={`${sizeClasses} font-bold ${textColor}`}>
          {value}%
        </span>
        <span className="text-gray-400 text-sm mb-1">
          {value > 50 ? 'High' : value > 30 ? 'Medium' : 'Low'}
        </span>
      </div>
      <ProgressBar value={value} color={color} height="h-1.5" />
    </motion.div>
  );
};

export default HealthMetric;
