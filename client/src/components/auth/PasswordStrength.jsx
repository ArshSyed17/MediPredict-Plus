import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PasswordStrength = ({ password }) => {
  const strength = useMemo(() => {
    let score = 0;
    if (!password) return { score: 0, label: 'Enter password', color: 'bg-gray-500' };

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  }, [password]);

  const { score, label, color } = strength;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3 }}
            className={`h-1.5 flex-1 rounded-full ${
              level <= score ? color : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-sm font-medium ${
          score <= 2 ? 'text-red-400' : score <= 4 ? 'text-yellow-400' : 'text-green-400'
        }`}
      >
        {label}
      </motion.p>
    </div>
  );
};

export default PasswordStrength;
