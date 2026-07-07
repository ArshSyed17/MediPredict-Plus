import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const HeroLeft = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
      >
        Predict Diseases Before They Become{' '}
        <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Problems.
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl"
      >
        AI-powered preventive healthcare platform that predicts diseases, explains health risks, and provides personalized prevention strategies with 95%+ accuracy.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(20, 184, 166, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(ROUTES.REGISTER)}
          className="px-8 py-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Start Free</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const el = document.getElementById('ai-demo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaPlay className="text-sm" />
          Watch Demo
        </motion.button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex items-center gap-8 pt-4"
      >
        <div className="text-center">
          <p className="text-3xl font-bold text-white">95%+</p>
          <p className="text-gray-400 text-sm">Accuracy</p>
        </div>
        <div className="w-px h-12 bg-white/20" />
        <div className="text-center">
          <p className="text-3xl font-bold text-white">100%</p>
          <p className="text-gray-400 text-sm">Privacy</p>
        </div>
        <div className="w-px h-12 bg-white/20" />
        <div className="text-center">
          <p className="text-3xl font-bold text-white">24/7</p>
          <p className="text-gray-400 text-sm">AI Support</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroLeft;
