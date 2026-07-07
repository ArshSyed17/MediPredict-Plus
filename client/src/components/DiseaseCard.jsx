import React from 'react';
import { motion } from 'framer-motion';

const DiseaseCard = ({ icon: Icon, name, accuracy, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-white text-xl" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-green-400 font-bold">{accuracy}%</span>
        <span className="text-gray-400 text-sm">Prediction Accuracy</span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default DiseaseCard;
