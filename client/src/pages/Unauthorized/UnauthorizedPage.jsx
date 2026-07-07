import React from 'react';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../constants/routes';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="bg-red-500/20 rounded-full p-6">
              <Lock className="h-16 w-16 text-red-400" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold text-white mb-4"
          >
            Access Denied
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-400 mb-8"
          >
            You don't have permission to access this page. Please log in to continue.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button onClick={() => window.location.href = ROUTES.LOGIN}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = ROUTES.LANDING}
            >
              Back to Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
