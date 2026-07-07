import React from 'react';
import { motion } from 'framer-motion';
import AuthBanner from '../components/auth/AuthBanner';
import AuthCard from '../components/auth/AuthCard';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Banner (40% on desktop) */}
        <div className="hidden lg:block lg:w-2/5 relative overflow-hidden">
          <AuthBanner />
        </div>

        {/* Right Side - Auth Form (60% on desktop, 100% on mobile/tablet) */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <AuthCard title={title} subtitle={subtitle}>
              {children}
            </AuthCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
