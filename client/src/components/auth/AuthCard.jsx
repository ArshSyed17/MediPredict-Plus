import React from 'react';
import { motion } from 'framer-motion';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
    >
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative p-8 sm:p-10">
        {/* Header */}
        <AuthHeader title={title} subtitle={subtitle} />

        {/* Form Content */}
        <div className="mt-8">
          {children}
        </div>

        {/* Footer */}
        <AuthFooter />
      </div>
    </motion.div>
  );
};

export default AuthCard;
