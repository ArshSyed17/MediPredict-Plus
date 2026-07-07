import React from 'react';
import { motion } from 'framer-motion';

const Card = React.memo(React.forwardRef(({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
  ...props
}, ref) => {
  const baseStyles = 'rounded-2xl border backdrop-blur-sm';
  
  const variants = {
    default: 'bg-white/80 border-gray-200 dark:bg-gray-800/80 dark:border-gray-700',
    glass: 'bg-white/10 border-white/20 dark:bg-gray-900/10 dark:border-gray-700/20',
    gradient: 'bg-gradient-to-br from-white/80 to-white/60 border-gray-200 dark:from-gray-800/80 dark:to-gray-800/60 dark:border-gray-700',
  };
  
  const hoverStyles = hover ? 'cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]' : '';
  
  const combinedClassName = `${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`;
  
  const CardComponent = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  } : {};
  
  return (
    <CardComponent
      ref={ref}
      className={combinedClassName}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
}));

Card.displayName = 'Card';

export default Card;
