import React from 'react';
import { motion } from 'framer-motion';

const AuthFooter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 pt-6 border-t border-white/10"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-gray-500 text-xs"
      >
        © 2026 MediPredict+. All rights reserved.
      </motion.p>
    </motion.div>
  );
};

export default AuthFooter;
