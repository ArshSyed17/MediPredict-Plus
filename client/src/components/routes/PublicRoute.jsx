import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import LoadingScreen from './LoadingScreen';

const PublicRoute = ({ children, restricted = true }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  // If route is restricted (like login/register) and user is logged in, redirect to dashboard
  if (isAuthenticated && restricted) {
    // Redirect to the page they came from, or dashboard by default
    const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
