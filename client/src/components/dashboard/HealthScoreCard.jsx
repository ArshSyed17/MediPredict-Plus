import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, TrendingDown } from 'lucide-react';

const HealthScoreCard = () => {
  const [score, setScore] = useState(0);
  const targetScore = 87;

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => {
        if (prev >= targetScore) return targetScore;
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Health Score</h3>
        <div className="flex items-center gap-1 text-green-400 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>+5%</span>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="relative flex items-center justify-center py-4">
        <svg className="w-48 h-48 transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="96"
            cy="96"
            r="80"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5 }}
            style={{ strokeDashoffset }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Heart className="w-8 h-8 text-red-400 mb-2" />
          <span className="text-4xl font-bold text-white">{score}</span>
          <span className="text-gray-400 text-sm">out of 100</span>
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        <p className="text-green-400 font-semibold text-lg">Excellent Health</p>
        <p className="text-gray-400 text-sm mt-1">
          Your health score is in the top 15% of users
        </p>
      </div>
    </motion.div>
  );
};

export default HealthScoreCard;
