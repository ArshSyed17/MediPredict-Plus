import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ id, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          {...props}
          className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
            error ? 'border-red-500' : 'border-white/20'
          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
          placeholder="Enter your password"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <motion.button
          type="button"
          onClick={togglePassword}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showPassword ? 'hide' : 'show'}
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          className="mt-2 text-sm text-red-400"
          role="alert"
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
};

export default PasswordInput;
