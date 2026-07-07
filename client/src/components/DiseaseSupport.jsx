import React from 'react';
import { motion } from 'framer-motion';
import { FaTint, FaHeartbeat, FaBrain, FaTachometerAlt, FaMicroscope, FaLungs } from 'react-icons/fa';
import DiseaseCard from './DiseaseCard';

const DiseaseSupport = () => {
  const diseases = [
    {
      icon: FaTint,
      name: 'Diabetes',
      accuracy: 98.7,
      description: 'Advanced prediction models for Type 1 and Type 2 diabetes using glucose levels, BMI, and lifestyle factors.',
      delay: 0,
    },
    {
      icon: FaMicroscope,
      name: 'Chronic Kidney Disease',
      accuracy: 96.5,
      description: 'Early detection of CKD through creatinine analysis, eGFR calculation, and risk factor assessment.',
      delay: 0.1,
    },
    {
      icon: FaHeartbeat,
      name: 'Heart Disease',
      accuracy: 97.2,
      description: 'Comprehensive cardiovascular risk assessment including coronary artery disease and heart failure prediction.',
      delay: 0.2,
    },
    {
      icon: FaBrain,
      name: 'Stroke',
      accuracy: 95.8,
      description: 'Stroke risk prediction using blood pressure, atrial fibrillation indicators, and lifestyle factors.',
      delay: 0.3,
    },
    {
      icon: FaLungs,
      name: 'Liver Disease',
      accuracy: 94.3,
      description: 'Detection of liver conditions including fatty liver disease, hepatitis, and cirrhosis risk assessment.',
      delay: 0.4,
    },
    {
      icon: FaTachometerAlt,
      name: 'Hypertension',
      accuracy: 97.9,
      description: 'Blood pressure analysis and hypertension risk prediction with personalized management recommendations.',
      delay: 0.5,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 via-red-900/20 to-slate-900 overflow-hidden">
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
            Disease Support & Prediction
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI-powered prediction for multiple diseases with industry-leading accuracy rates
          </p>
        </motion.div>

        {/* Disease Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease) => (
            <DiseaseCard key={disease.name} {...disease} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiseaseSupport;
