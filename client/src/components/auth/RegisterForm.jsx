import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Ruler, Scale, Lock } from 'lucide-react';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import ProfileAvatarUpload from './ProfileAvatarUpload';
import LoadingButton from './LoadingButton';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { ROUTES } from '../../constants';

const RegisterForm = () => {
  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      role: 'patient',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const { register, login } = useAuth();
  const { success, error } = useToast();

  const onSubmit = async (data) => {
    try {
      await register(data);
      success('Registration successful');
      window.location.href = ROUTES.DASHBOARD;
    } catch (err) {
      error(err.message || 'Registration failed');
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Profile Avatar Upload */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ProfileAvatarUpload />
      </motion.div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="firstName"
              {...formRegister('firstName', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters',
                },
              })}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.firstName ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
              placeholder="John"
            />
          </div>
          {errors.firstName && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-400">
              {errors.firstName.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="lastName"
              {...formRegister('lastName', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters',
                },
              })}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.lastName ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
              placeholder="Doe"
            />
          </div>
          {errors.lastName && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-400">
              {errors.lastName.message}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
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
            {...formRegister('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
              errors.email ? 'border-red-500' : 'border-white/20'
            } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
            placeholder="john@example.com"
          />
        </div>
        {errors.email && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="phone"
            type="tel"
            {...formRegister('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[+]?[\d\s-()]{10,}$/,
                message: 'Invalid phone number',
              },
            })}
            className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
              errors.phone ? 'border-red-500' : 'border-white/20'
            } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        {errors.phone && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-400">
            {errors.phone.message}
          </motion.p>
        )}
      </motion.div>

      {/* Age and Gender */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
            Age
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="age"
              type="number"
              {...formRegister('age', {
                required: 'Age is required',
                min: {
                  value: 18,
                  message: 'You must be at least 18 years old',
                },
                max: {
                  value: 120,
                  message: 'Please enter a valid age',
                },
              })}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.age ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
              placeholder="25"
            />
          </div>
          {errors.age && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-400">
              {errors.age.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
            Gender
          </label>
          <select
            id="gender"
            {...formRegister('gender', {
              required: 'Gender is required',
            })}
            className={`w-full px-4 py-3 bg-white/5 border ${
              errors.gender ? 'border-red-500' : 'border-white/20'
            } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
          >
            <option value="" className="bg-slate-900 text-gray-400">
              Select gender
            </option>
            <option value="male" className="bg-slate-900">
              Male
            </option>
            <option value="female" className="bg-slate-900">
              Female
            </option>
            <option value="other" className="bg-slate-900">
              Other
            </option>
          </select>
          {errors.gender && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-400">
              {errors.gender.message}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Height and Weight */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">
            Height (cm)
          </label>
          <div className="relative">
            <Ruler className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="height"
              type="number"
              {...formRegister('height', {
                required: 'Height is required',
                min: {
                  value: 50,
                  message: 'Please enter a valid height',
                },
                max: {
                  value: 250,
                  message: 'Please enter a valid height',
                },
              })}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.height ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
              placeholder="175"
            />
          </div>
          {errors.height && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-400">
              {errors.height.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">
            Weight (kg)
          </label>
          <div className="relative">
            <Scale className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="weight"
              type="number"
              {...formRegister('weight', {
                required: 'Weight is required',
                min: {
                  value: 20,
                  message: 'Please enter a valid weight',
                },
                max: {
                  value: 300,
                  message: 'Please enter a valid weight',
                },
              })}
              className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                errors.weight ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200`}
              placeholder="70"
            />
          </div>
          {errors.weight && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-400">
              {errors.weight.message}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Password */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <PasswordInput
          id="password"
          {...formRegister('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          error={errors.password}
          autoComplete="new-password"
        />
        <PasswordStrength password={password} />
      </motion.div>

      {/* Confirm Password */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.55 }}
      >
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
          Confirm Password
        </label>
        <PasswordInput
          id="confirmPassword"
          {...formRegister('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
        {confirmPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-2 text-sm flex items-center gap-2 ${
              passwordsMatch ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
          </motion.div>
        )}
      </motion.div>



      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.65 }}
      >
        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
        >
          Create Account
        </LoadingButton>
      </motion.div>

      {/* Sign In Link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="text-center text-sm text-gray-400"
      >
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200">
          Sign In
        </Link>
      </motion.p>
    </form>
  );
};

export default RegisterForm;
