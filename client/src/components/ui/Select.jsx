import React from 'react';

const Select = React.forwardRef(({ label, options = [], error, helperText, className = '', id, ...props }, ref) => {
  const selectId = id || Math.random().toString(36).substring(7);
  
  return (
    <div className={\`w-full \${className}\`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={\`w-full rounded-md border \${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:text-white'
        } px-3 py-2 shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200\`}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
