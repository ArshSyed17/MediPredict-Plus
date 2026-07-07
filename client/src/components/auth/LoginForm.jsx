import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import PasswordInput from './PasswordInput';
import RememberMe from './RememberMe';
import LoadingButton from './LoadingButton';
import SocialLogin from './SocialLogin';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROUTES } from '../../constants';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const { login } = useAuth();
  const { success, error } = useToast();

  const onSubmit = async (data) => {
    try {
      await login(data);
      success('Successfully logged in');
      window.location.href = ROUTES.DASHBOARD;
    } catch (err) {
      error(err.message || 'Failed to login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
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
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="email-error"
            className="mt-2 text-sm text-red-400"
            role="alert"
          >
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      {/* Password Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <PasswordInput
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          error={errors.password}
          autoComplete="current-password"
        />
      </motion.div>

      {/* Remember Me & Forgot Password */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <RememberMe checked={watch('remember')} {...register('remember')} />
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="text-sm text-teal-400 hover:text-teal-300 transition-colors duration-200"
        >
          Forgot Password?
        </Link>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
        >
          Sign In
        </LoadingButton>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
        </div>
      </motion.div>

      {/* Social Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <SocialLogin />
      </motion.div>

      {/* Sign Up Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="text-center text-sm text-gray-400"
      >
        Don't have an account?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200"
        >
          Create Account
        </Link>
      </motion.p>
    </form>
  );
};

export default LoginForm;
