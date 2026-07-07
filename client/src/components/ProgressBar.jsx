import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value, color, bgColor = 'bg-gray-700', height = 'h-2', animated = true }) => {
  return (
    <div className={`w-full ${height} ${bgColor} rounded-full overflow-hidden`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: animated ? 1.5 : 0, ease: 'easeOut' }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  );
};

export default ProgressBar;
