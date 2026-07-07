import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Droplets, Thermometer, Weight, Moon } from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, unit, trend, color }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue((prev) => {
        if (prev >= value) return value;
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">
        {displayValue}
        <span className="text-sm text-gray-400 ml-1">{unit}</span>
      </p>
      <p className="text-gray-400 text-xs mt-1">{label}</p>
    </motion.div>
  );
};

const HealthMetricsGrid = () => {
  const metrics = [
    { icon: Heart, label: 'Heart Rate', value: 72, unit: 'bpm', trend: -3, color: 'bg-red-500/20' },
    { icon: Activity, label: 'Blood Pressure', value: 120, unit: 'mmHg', trend: 2, color: 'bg-teal-500/20' },
    { icon: Droplets, label: 'Blood Sugar', value: 95, unit: 'mg/dL', trend: 0, color: 'bg-purple-500/20' },
    { icon: Thermometer, label: 'Body Temp', value: 98, unit: '°F', trend: 0, color: 'bg-orange-500/20' },
    { icon: Weight, label: 'Weight', value: 175, unit: 'lbs', trend: -2, color: 'bg-green-500/20' },
    { icon: Moon, label: 'Sleep', value: 7.5, unit: 'hrs', trend: 5, color: 'bg-indigo-500/20' },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Health Metrics</h3>
        <span className="text-gray-400 text-sm">Real-time</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthMetricsGrid;
