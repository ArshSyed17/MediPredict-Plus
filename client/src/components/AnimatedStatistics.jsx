import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaDatabase, FaCogs } from 'react-icons/fa';

const StatCard = ({ icon: Icon, value, suffix, label, delay = 0 }) => {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
    >
      <Icon className="text-4xl text-blue-400 mx-auto mb-4" />
      <p className="text-4xl sm:text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-gray-400 text-lg">{label}</p>
    </motion.div>
  );
};

const AnimatedStatistics = () => {
  const stats = [
    { icon: FaChartLine, value: 95, suffix: '%+', label: 'Model Validation Accuracy', delay: 0 },
    { icon: FaDatabase, value: 6, suffix: '', label: 'Disease Risk Models', delay: 0.1 },
    { icon: FaUsers, value: 100, suffix: '%', label: 'Open-Source & Privacy Focused', delay: 0.2 },
    { icon: FaCogs, value: 15, suffix: '+', label: 'Health Metrics Checked', delay: 0.3 },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 via-green-900/20 to-slate-900 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-world results demonstrating the power of AI in preventive healthcare
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStatistics;
