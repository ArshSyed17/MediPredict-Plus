import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, FileText, Activity, Settings, MessageSquare, FlaskConical } from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: Activity, label: 'New Prediction', color: 'from-teal-500 to-emerald-500', path: '/prediction' },
    { icon: FlaskConical, label: 'Risk Simulator', color: 'from-emerald-500 to-cyan-500', path: '/simulator' },
    { icon: FileText, label: 'Medical Reports', color: 'from-cyan-500 to-teal-500', path: '/reports' },
    { icon: MessageSquare, label: 'Ask AI', color: 'from-teal-600 to-cyan-600', path: '/ask-ai' },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Quick Actions</h3>
        <Plus className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => action.path && navigate(action.path)}
            className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200 flex flex-col items-center gap-2"
          >
            <div className={`p-3 bg-gradient-to-br ${action.color} rounded-xl`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs font-medium">{action.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/settings')}
        className="w-full mt-4 py-3 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/10 flex items-center justify-center gap-2"
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm font-medium">Settings</span>
      </motion.button>
    </motion.div>
  );
};

export default QuickActions;
