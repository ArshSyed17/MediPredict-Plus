import React from 'react';
import { motion } from 'framer-motion';

const LogoCard = ({ name, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300"
    >
      <Icon className="text-3xl text-gray-400" />
      <span className="text-gray-300 font-medium">{name}</span>
    </motion.div>
  );
};

export default LogoCard;
