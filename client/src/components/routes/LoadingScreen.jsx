import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/30">
            <HeartPulse className="w-9 h-9 text-white" />
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">MediPredict+</span>
        </motion.div>

        {/* Animated Pulse Bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-end justify-center gap-1.5 h-10"
        >
          {[0.3, 0.6, 1, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-gradient-to-t from-teal-600 to-emerald-400 rounded-full"
              animate={{ scaleY: [h, 1, h] }}
              transition={{
                duration: 1,
                delay: i * 0.12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ height: `${h * 40}px`, originY: 1 }}
            />
          ))}
        </motion.div>

        {/* Status Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-teal-400/80 text-sm font-medium tracking-wider"
        >
          Initializing AI Health Platform...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;
