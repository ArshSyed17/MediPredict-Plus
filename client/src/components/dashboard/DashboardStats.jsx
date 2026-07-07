import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Brain, Shield } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, suffix, color }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setCount(Math.min(value, Math.floor(count + increment)));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setCount(value);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-gradient-to-br ${color} backdrop-blur-xl rounded-2xl p-6 border border-white/20 relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white/5" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-3xl font-bold text-white mb-1">
          {count.toLocaleString()}{suffix}
        </p>
        <p className="text-white/80 text-sm">{label}</p>
      </div>
    </motion.div>
  );
};

const DashboardStats = ({ stats }) => {
  const displayStats = [
    { icon: Activity, label: 'Health Predictions', value: stats?.totalPredictions ?? 0, suffix: '', color: 'from-teal-600 to-teal-700' },
    { icon: Brain, label: 'AI Insights Generated', value: stats?.insightsGenerated ?? 0, suffix: '', color: 'from-emerald-600 to-emerald-700' },
    { icon: Shield, label: 'Risk Assessments', value: stats?.riskAssessments ?? 0, suffix: '', color: 'from-cyan-600 to-cyan-700' },
    { icon: Users, label: 'Days Tracked', value: stats?.daysTracked ?? 1, suffix: '', color: 'from-teal-500 to-emerald-600' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
