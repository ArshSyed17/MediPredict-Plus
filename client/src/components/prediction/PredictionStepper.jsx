import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PredictionStepper = ({ steps, currentStep }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                index < currentStep
                  ? 'bg-green-500 border-green-500'
                  : index === currentStep
                  ? 'bg-cyan-500 border-cyan-500'
                  : 'bg-transparent border-gray-600'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className={`text-xs font-medium ${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                  {index + 1}
                </span>
              )}
            </motion.div>
            <div>
              <p className={`text-xs font-medium ${index === currentStep ? 'text-white' : 'text-gray-400'}`}>
                {step.title}
              </p>
              <p className="text-[10px] text-slate-400">{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionStepper;
