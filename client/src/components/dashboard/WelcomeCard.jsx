import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const WelcomeCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const features = [
    { label: 'AI Prediction', path: '/prediction', desc: 'Predict disease risks' },
    { label: 'Risk Simulator', path: '/simulator', desc: 'Simulate lifestyle changes' },
    { label: 'My Predictions', path: '/reports', desc: 'View your AI assessments' },
    { label: 'Ask AI', path: '/ask-ai', desc: 'Chat with health assistant' },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className="bg-gradient-to-r from-teal-600/20 via-cyan-600/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Top Row */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {getGreeting()}, {user?.firstName || 'Arsh'} 👋
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">{currentDate}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm sm:text-base mb-5 max-w-2xl leading-relaxed">
          Welcome to <span className="text-teal-400 font-semibold">MediPredict+</span>. Explore your AI-powered health dashboard — run disease predictions, simulate lifestyle changes, and review your medical reports all in one place.
        </p>

        {/* Feature Buttons */}
        <div className="flex flex-wrap gap-3">
          {features.map(({ label, path, desc }) => (
            <motion.button
              key={path}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(path)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/30 rounded-xl text-sm text-gray-200 hover:text-teal-300 transition-all duration-200 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{label}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
