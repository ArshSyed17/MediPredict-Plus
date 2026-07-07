import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({
  className = '',
  variant = 'default',
  width,
  height,
  rounded = 'md',
  animate = true,
}) => {
  const baseStyles = 'bg-gray-200 dark:bg-gray-700';
  
  const variants = {
    default: '',
    circle: 'rounded-full',
    rounded: 'rounded-lg',
  };
  
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };
  
  const combinedClassName = `${baseStyles} ${variants[variant]} ${roundedStyles[rounded]} ${className}`;
  
  const style = {
    width: width || '100%',
    height: height || '1rem',
  };
  
  const SkeletonComponent = animate ? motion.div : 'div';
  const motionProps = animate ? {
    initial: { opacity: 0.5 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, repeat: Infinity, repeatType: 'reverse' },
  } : {};
  
  return (
    <SkeletonComponent
      className={combinedClassName}
      style={style}
      {...motionProps}
    />
  );
};

export default Skeleton;
