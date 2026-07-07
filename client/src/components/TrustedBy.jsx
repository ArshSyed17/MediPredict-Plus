import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHospital, FaUserMd, FaGraduationCap, FaFlask, FaMicroscope, FaHeartbeat } from 'react-icons/fa';
import LogoCard from './LogoCard';

const TrustedBy = () => {
  const [counters, setCounters] = useState({
    professionals: 0,
    researchers: 0,
    students: 0,
    institutions: 0,
  });

  useEffect(() => {
    const targets = {
      professionals: 5000,
      researchers: 2500,
      students: 10000,
      institutions: 150,
    };

    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;

    let currentStep = 0;

    const counterInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        professionals: Math.floor(targets.professionals * progress),
        researchers: Math.floor(targets.researchers * progress),
        students: Math.floor(targets.students * progress),
        institutions: Math.floor(targets.institutions * progress),
      });

      if (currentStep >= steps) {
        clearInterval(counterInterval);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(counterInterval);
  }, []);

  const logos = [
    { name: 'MediCare Plus', icon: FaHospital, delay: 0 },
    { name: 'HealthTech AI', icon: FaFlask, delay: 0.1 },
    { name: 'Dr. Smith Clinic', icon: FaUserMd, delay: 0.2 },
    { name: 'Medical University', icon: FaGraduationCap, delay: 0.3 },
    { name: 'BioResearch Labs', icon: FaMicroscope, delay: 0.4 },
    { name: 'CardioCare', icon: FaHeartbeat, delay: 0.5 },
  ];

  const stats = [
    { label: 'Healthcare Professionals', value: counters.professionals, suffix: '+', icon: FaUserMd },
    { label: 'AI Researchers', value: counters.researchers, suffix: '+', icon: FaFlask },
    { label: 'Medical Students', value: counters.students, suffix: '+', icon: FaGraduationCap },
    { label: 'Medical Institutions', value: counters.institutions, suffix: '+', icon: FaHospital },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 via-blue-900/50 to-slate-900 overflow-hidden">
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
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of healthcare providers, researchers, and institutions using MediPredict+
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {logos.map((logo, index) => (
            <LogoCard key={logo.name} {...logo} />
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
            >
              <stat.icon className="text-3xl text-blue-400 mx-auto mb-4" />
              <p className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.value.toLocaleString()}{stat.suffix}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
