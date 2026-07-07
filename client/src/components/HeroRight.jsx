import React from 'react';
import { motion } from 'framer-motion';
import AIHealthDashboard from './AIHealthDashboard';

const HeroRight = () => {
  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      variants={floatVariants}
      initial="initial"
      animate="animate"
      className="relative"
    >
      <AIHealthDashboard />
    </motion.div>
  );
};

export default HeroRight;
