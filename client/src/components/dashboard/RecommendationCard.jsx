import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ChevronRight, HeartPulse, Dumbbell, Droplets, Moon } from 'lucide-react';

const DAILY_TIPS = [
  {
    icon: Dumbbell,
    color: 'from-teal-500/20 to-emerald-500/20',
    border: 'border-teal-500/20',
    iconColor: 'text-teal-400',
    title: 'Stay Active',
    body: '30 minutes of brisk walking daily can reduce your risk of heart disease by up to 35%. Start with 10-minute sessions if needed.',
    question: 'What are the best exercises for a beginner to improve heart health?',
  },
  {
    icon: Droplets,
    color: 'from-cyan-500/20 to-teal-500/20',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    title: 'Hydration Matters',
    body: 'Drinking 8 glasses of water daily helps regulate blood pressure, supports kidney function, and improves metabolism.',
    question: 'How much water should I drink daily and what are the benefits of staying hydrated?',
  },
  {
    icon: Moon,
    color: 'from-indigo-500/20 to-purple-500/20',
    border: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
    title: 'Prioritize Sleep',
    body: 'Getting 7-9 hours of sleep lowers cortisol levels, reduces inflammation, and supports healthy blood sugar regulation.',
    question: 'How does sleep quality affect my heart health and blood sugar levels?',
  },
];

const RecommendationCard = () => {
  const navigate = useNavigate();
  const tip = DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length];
  const Icon = tip.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${tip.color} backdrop-blur-xl rounded-2xl p-5 border ${tip.border}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${tip.iconColor}`} />
        </div>
        <span className={`text-xs font-semibold uppercase tracking-wide ${tip.iconColor}`}>
          Daily Health Tip
        </span>
      </div>

      <h3 className="text-white font-bold text-base mb-2">{tip.title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{tip.body}</p>

      <motion.button
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate('/ask-ai')}
        className={`flex items-center gap-1.5 text-sm font-medium ${tip.iconColor} hover:opacity-80 transition-opacity`}
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Ask AI About This
        <ChevronRight className="w-3.5 h-3.5" />
      </motion.button>
    </motion.div>
  );
};

export default RecommendationCard;
