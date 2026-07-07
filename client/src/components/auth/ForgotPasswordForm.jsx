import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import LoadingButton from './LoadingButton';

const ForgotPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setEmail(data.email);
    setIsSuccess(true);
    console.log('Reset password for:', data.email);
  };

  const handleBackToLogin = () => {
    setIsSuccess(false);
    setEmail('');
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                      errors.email ? 'border-red-500' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Enter your email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                    role="alert"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <LoadingButton
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Send Reset Link
                </LoadingButton>
              </motion.div>

              {/* Back to Login */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </a>
              </motion.div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-6"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>

            {/* Success Message */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Check Your Email</h3>
              <p className="text-gray-400">
                We've sent a password reset link to
              </p>
              <p className="text-teal-400 font-medium">{email}</p>
            </div>

            {/* Instructions */}
            <div className="bg-white/5 rounded-xl p-4 text-left">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-medium">Next steps:</span>
                <br />
                1. Open your email inbox
                <br />
                2. Find the email from MediPredict+
                <br />
                3. Click the reset link
                <br />
                4. Create your new password
              </p>
            </div>

            {/* Resend Link */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToLogin}
              className="flex items-center justify-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPasswordForm;
