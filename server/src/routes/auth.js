const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authenticateRefreshToken } = require('../middlewares/auth');
const { authValidation } = require('../middlewares/validate');
const { authLimiter, passwordResetLimiter } = require('../middlewares/rateLimiter');

/**
 * Authentication Routes
 * Base path: /api/auth
 */

// Public routes with rate limiting
router.post('/register', authLimiter, authValidation.register, authController.register);
router.post('/login', authLimiter, authValidation.login, authController.login);
router.post('/forgot-password', passwordResetLimiter, authValidation.forgotPassword, authController.forgotPassword);
router.post('/reset-password', authValidation.resetPassword, authController.resetPassword);
router.post('/verify-email', authValidation.verifyEmail, authController.verifyEmail);

// Refresh token route
router.post('/refresh', authenticateRefreshToken, authController.refreshToken);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.post('/change-password', authenticate, authValidation.userValidation.changePassword, authController.changePassword);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
