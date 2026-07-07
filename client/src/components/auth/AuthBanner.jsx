import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaBrain, FaShieldAlt, FaRobot, FaUserMd } from 'react-icons/fa';

const AuthBanner = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  const floatingCards = [
    { icon: FaHeartbeat, color: 'from-red-500 to-pink-500', delay: 0 },
    { icon: FaBrain, color: 'from-blue-500 to-cyan-500', delay: 0.5 },
    { icon: FaShieldAlt, color: 'from-green-500 to-emerald-500', delay: 1 },
    { icon: FaRobot, color: 'from-purple-500 to-violet-500', delay: 1.5 },
    { icon: FaUserMd, color: 'from-orange-500 to-yellow-500', delay: 2 },
  ];

  return (
    <div className="relative h-full bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-600 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25) 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 lg:p-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
              <FaHeartbeat className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">MediPredict+</h1>
              <p className="text-white/80 text-sm">AI Healthcare Platform</p>
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Predict Today.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Protect Tomorrow.
            </span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-white/80 text-center max-w-md mb-12 leading-relaxed"
        >
          Advanced AI-powered disease prediction platform that helps healthcare professionals and patients make informed decisions about preventive care.
        </motion.p>

        {/* Floating Health Cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {floatingCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: card.delay }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: card.delay,
                  ease: 'easeInOut',
                }}
                className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center shadow-lg border border-white/20`}
              >
                <card.icon className="text-white text-xl" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-8 right-8 flex justify-around"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-white">95%+</p>
            <p className="text-white/70 text-xs">Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-white/70 text-xs">Privacy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-white/70 text-xs">AI Support</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthBanner;
