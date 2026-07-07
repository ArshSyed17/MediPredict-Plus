import React from 'react';
import { motion } from 'framer-motion';
import AuthLayout from '../../layouts/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join MediPredict+ and start your health journey"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
