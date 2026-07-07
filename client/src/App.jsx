import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/routes/LoadingScreen';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';
import RoleProtectedRoute from './components/routes/RoleProtectedRoute';
import { ROUTES, ROLES } from './constants';

// Lazy load pages for performance
const LandingPage = lazy(() => import('./pages/Landing/LandingPage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/Auth/ForgotPasswordPage'));

const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage'));
const PredictionPage = lazy(() => import('./pages/Prediction/PredictionPage'));
const HealthSimulatorPage = lazy(() => import('./pages/Simulator/HealthSimulatorPage'));
const ReportsPage = lazy(() => import('./pages/Reports/ReportsPage'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage'));
const AskAIPage = lazy(() => import('./pages/AskAI/AskAIPage'));

const DoctorDashboard = lazy(() => import('./pages/Doctor/DoctorDashboard'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));

// Error Pages
const NotFoundPage = lazy(() => import('./pages/Notfound/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('./pages/Unauthorized/UnauthorizedPage'));
const ServerErrorPage = lazy(() => import('./pages/ServerError/ServerErrorPage'));
const NetworkErrorPage = lazy(() => import('./pages/NetworkError/NetworkErrorPage'));
const OfflinePage = lazy(() => import('./pages/Offline/OfflinePage'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.LANDING} element={<PublicRoute restricted={false}><LandingPage /></PublicRoute>} />
            <Route path={ROUTES.LOGIN} element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path={ROUTES.REGISTER} element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />

            {/* General Protected Routes */}
            <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path={ROUTES.PREDICTION} element={<ProtectedRoute><PredictionPage /></ProtectedRoute>} />
            <Route path={ROUTES.SIMULATOR} element={<ProtectedRoute><HealthSimulatorPage /></ProtectedRoute>} />
            <Route path={ROUTES.REPORTS} element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            <Route path={ROUTES.PROFILE} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path={ROUTES.SETTINGS} element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path={ROUTES.ASK_AI} element={<ProtectedRoute><AskAIPage /></ProtectedRoute>} />

            {/* Role Specific Routes */}
            <Route 
              path={ROUTES.DOCTOR_DASHBOARD} 
              element={
                <RoleProtectedRoute allowedRoles={[ROLES.DOCTOR, ROLES.ADMIN]}>
                  <DoctorDashboard />
                </RoleProtectedRoute>
              } 
            />
            
            <Route 
              path={ROUTES.ADMIN_DASHBOARD} 
              element={
                <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                  <AdminDashboard />
                </RoleProtectedRoute>
              } 
            />

            {/* Error Routes */}
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
            <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />
            <Route path={ROUTES.NETWORK_ERROR} element={<NetworkErrorPage />} />
            <Route path={ROUTES.OFFLINE} element={<OfflinePage />} />

            {/* Catch all - 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;