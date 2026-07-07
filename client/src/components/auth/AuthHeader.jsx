import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      {/* Mobile Logo (only visible on mobile/tablet) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:hidden flex items-center justify-center gap-2 mb-6"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <FaHeartbeat className="text-white text-xl" />
        </div>
        <span className="text-xl font-bold text-white">MediPredict+</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl font-bold text-white mb-2"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-300 text-sm sm:text-base"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default AuthHeader;
