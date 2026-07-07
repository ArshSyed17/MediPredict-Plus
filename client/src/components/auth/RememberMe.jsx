import React from 'react';
import { motion } from 'framer-motion';

const RememberMe = ({ checked, onChange, ...props }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <motion.div
          className={`w-5 h-5 rounded border-2 transition-colors duration-200 flex items-center justify-center ${
            checked
              ? 'bg-teal-500 border-teal-500'
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
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
        Remember me
      </span>
    </label>
  );
};

export default RememberMe;
