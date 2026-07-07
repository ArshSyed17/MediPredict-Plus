import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';

const ErrorState = ({ title = 'Something went wrong', message = 'We encountered an unexpected error. Please try again later.', onRetry, className = '' }) => {
  return (
    <div className={\`flex flex-col items-center justify-center p-8 text-center \${className}\`}>
      <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 rounded-full mb-4">
        <AlertCircle size={48} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
