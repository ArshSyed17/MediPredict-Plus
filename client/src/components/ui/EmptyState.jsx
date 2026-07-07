import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, AlertCircle, Search, FileText } from 'lucide-react';

const EmptyState = ({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className = '',
}) => {
  const icons = {
    default: Inbox,
    error: AlertCircle,
    search: Search,
    document: FileText,
  };
  
  const IconComponent = icon || icons[variant];
  
  const variants = {
    default: 'text-gray-400',
    error: 'text-red-400',
    search: 'text-blue-400',
    document: 'text-purple-400',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-4"
      >
        <IconComponent className={`h-16 w-16 ${variants[variant]}`} />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6"
      >
        {description}
      </motion.p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
