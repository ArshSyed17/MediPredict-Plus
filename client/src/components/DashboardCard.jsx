import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default DashboardCard;
