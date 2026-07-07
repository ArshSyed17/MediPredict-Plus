import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaHeartbeat, FaFileMedical, FaRunning, FaLightbulb, FaUserMd } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      icon: FaBrain,
      title: 'AI Disease Prediction',
      description: 'Advanced machine learning algorithms predict disease risks with 98.7% accuracy using comprehensive health data analysis.',
      delay: 0,
    },
    {
      icon: FaHeartbeat,
      title: 'Health Risk Analysis',
      description: 'Real-time assessment of health risks across multiple parameters with personalized risk scores and actionable insights.',
      delay: 0.1,
    },
    {
      icon: FaFileMedical,
      title: 'Medical Report Generation',
      description: 'Automated generation of detailed medical reports with AI-powered insights, recommendations, and trend analysis.',
      delay: 0.2,
    },
    {
      icon: FaRunning,
      title: 'Lifestyle Simulator',
      description: 'Simulate the impact of lifestyle changes on your health outcomes with predictive modeling and scenario analysis.',
      delay: 0.3,
    },
    {
      icon: FaLightbulb,
      title: 'AI Explainability',
      description: 'Understand AI predictions with transparent explanations, feature importance analysis, and interpretable insights.',
      delay: 0.4,
    },
    {
      icon: FaUserMd,
      title: 'Doctor Dashboard',
      description: 'Comprehensive dashboard for healthcare professionals to monitor patients, track predictions, and manage care plans.',
      delay: 0.5,
    },
  ];

  return (
    <section id="features" className="relative py-20 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900 overflow-hidden">
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
            Powerful AI Healthcare Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive suite of AI-powered tools designed to revolutionize preventive healthcare
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
