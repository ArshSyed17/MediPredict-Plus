import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingButton = ({ children, isLoading, disabled, className = '', ...props }) => {
  return (
    <motion.button
      type="button"
      disabled={isLoading || disabled}
      whileHover={!isLoading && !disabled ? { scale: 1.02 } : {}}
      whileTap={!isLoading && !disabled ? { scale: 0.98 } : {}}
      className={`relative px-6 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white rounded-xl font-semibold overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="w-5 h-5" />
            </motion.div>
            <span>Signing in...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Animation Overlay */}
      {!isLoading && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-emerald-600 to-teal-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      )}
    </motion.button>
  );
};

export default LoadingButton;
