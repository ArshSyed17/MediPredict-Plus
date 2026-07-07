import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, AlertCircle, Info } from 'lucide-react';

const HealthTimeline = () => {
  const events = [
    {
      date: 'Today',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      title: 'Health Score Updated',
      description: 'Your health score improved to 87',
    },
    {
      date: 'Yesterday',
      icon: AlertCircle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      title: 'Blood Pressure Alert',
      description: 'Slightly elevated readings detected',
    },
    {
      date: '2 days ago',
      icon: Info,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/20',
      title: 'New Recommendation',
      description: 'AI suggested increasing water intake',
    },
    {
      date: '1 week ago',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      title: 'Lab Results Available',
      description: 'All test results are normal',
    },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Health Timeline</h3>
        <Calendar className="w-5 h-5 text-purple-400" />
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex gap-3"
          >
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-lg ${event.bgColor}`}>
                <event.icon className={`w-4 h-4 ${event.color}`} />
              </div>
              {index !== events.length - 1 && (
                <div className="w-0.5 h-full bg-white/10 mt-2" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-gray-400 text-xs mb-1">{event.date}</p>
              <h4 className="text-white font-medium text-sm mb-1">{event.title}</h4>
              <p className="text-gray-300 text-xs">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthTimeline;
