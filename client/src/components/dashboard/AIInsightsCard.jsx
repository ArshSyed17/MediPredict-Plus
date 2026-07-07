import React from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const AIInsightsCard = () => {
  const insights = [
    {
      type: 'alert',
      icon: AlertTriangle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      title: 'Elevated Blood Pressure',
      description: 'Your recent readings show a 12% increase. Consider reducing sodium intake.',
    },
    {
      type: 'success',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      title: 'Improved Sleep Quality',
      description: 'Average sleep duration increased to 7.5 hours. Keep up the good work!',
    },
    {
      type: 'info',
      icon: Info,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/20',
      title: 'Vitamin D Deficiency',
      description: 'Your levels are slightly low. Consider supplements or more sunlight exposure.',
    },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">AI Insights</h3>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-teal-400" />
          <span className="text-teal-400 text-sm font-medium">AI Powered</span>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className={`p-4 ${insight.bgColor} rounded-xl border border-white/10 cursor-pointer transition-all duration-200`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                <insight.icon className={`w-4 h-4 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm mb-1">
                  {insight.title}
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-3 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-xl text-teal-400 font-medium hover:from-teal-500/30 hover:to-emerald-500/30 transition-all duration-200 border border-teal-500/30"
      >
        View All Insights
      </motion.button>
    </motion.div>
  );
};

export default AIInsightsCard;
