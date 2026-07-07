import React from 'react';
import { motion } from 'framer-motion';

const TermsCheckbox = ({ checked, onChange, error, ...props }) => {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative pt-1">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <motion.div
            className={`w-5 h-5 rounded border-2 transition-colors duration-200 flex items-center justify-center flex-shrink-0 ${
              error
                ? 'border-red-500 bg-red-500/20'
                : checked
                ? 'bg-blue-500 border-blue-500'
                : 'border-white/30 group-hover:border-white/50'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: checked ? 1 : 0, scale: checked ? 1 : 0.5 }}
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: checked ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          </motion.div>
        </div>
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 leading-relaxed">
          I agree to the{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
            Privacy Policy
          </a>
        </span>
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400"
          role="alert"
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
};

export default TermsCheckbox;
