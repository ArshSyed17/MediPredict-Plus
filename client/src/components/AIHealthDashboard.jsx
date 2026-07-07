import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaShieldAlt, FaRobot, FaClock } from 'react-icons/fa';
import DashboardCard from './DashboardCard';
import HealthMetric from './HealthMetric';
import ProgressBar from './ProgressBar';

const AIHealthDashboard = () => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev >= 87) return 87;
        return prev + 1;
      });
    }, 30);

    const confidenceInterval = setInterval(() => {
      setAnimatedConfidence((prev) => {
        if (prev >= 94.7) return 94.7;
        return prev + 0.5;
      });
    }, 30);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(confidenceInterval);
    };
  }, []);

  const diseaseRisks = [
    { label: 'Diabetes', value: 23, icon: FaRobot, color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-500/20', textColor: 'text-orange-400' },
    { label: 'CKD', value: 8, icon: FaShieldAlt, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
    { label: 'Heart Disease', value: 15, icon: FaChartLine, color: 'from-red-400 to-pink-500', bgColor: 'bg-red-500/20', textColor: 'text-red-400' },
    { label: 'Stroke', value: 12, icon: FaShieldAlt, color: 'from-purple-400 to-violet-500', bgColor: 'bg-purple-500/20', textColor: 'text-purple-400' },
    { label: 'Liver Disease', value: 5, icon: FaRobot, color: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
  ];

  const recommendations = [
    'Increase daily physical activity by 30 minutes',
    'Reduce sodium intake to under 2,300mg/day',
    'Schedule annual diabetes screening',
    'Monitor blood pressure weekly',
  ];

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
      }}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <DashboardCard className="relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Patient Info Header */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">John Anderson</h3>
              <p className="text-gray-400 text-sm">45 years • Male</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Live</span>
          </div>
        </div>

        {/* Overall Wellness Score */}
        <div className="relative mb-6 p-5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 font-semibold">Overall Wellness Score</span>
            <span className="text-green-400 font-bold text-2xl">{animatedScore}%</span>
          </div>
          <ProgressBar value={animatedScore} color="bg-gradient-to-r from-green-400 to-emerald-500" height="h-3" />
        </div>

        {/* AI Confidence */}
        <div className="relative mb-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FaRobot className="text-teal-400" />
              <span className="text-gray-300 font-medium">AI Confidence</span>
            </div>
            <span className="text-teal-400 font-bold">{animatedConfidence.toFixed(1)}%</span>
          </div>
          <ProgressBar value={animatedConfidence} color="bg-gradient-to-r from-teal-500 to-emerald-500" height="h-2" />
        </div>

        {/* Disease Risks */}
        <div className="relative mb-6">
          <h4 className="text-white font-semibold mb-4">Disease Risk Analysis</h4>
          <div className="grid grid-cols-2 gap-3">
            {diseaseRisks.map((risk, index) => (
              <HealthMetric key={risk.label} {...risk} />
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="relative mb-6 p-4 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-2xl border border-teal-500/30">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <FaRobot className="text-teal-400" />
            Today's AI Recommendations
          </h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-gray-300 text-sm flex items-start gap-2"
              >
                <span className="text-teal-400 mt-1">•</span>
                {rec}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Footer Info */}
        <div className="relative flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FaClock className="text-xs" />
            <span>Last Updated: Just now</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-green-400 text-sm font-medium">Prediction Completed</span>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
};

export default AIHealthDashboard;
