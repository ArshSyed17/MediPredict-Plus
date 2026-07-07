const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');

/**
 * Dashboard Routes
 * Base path: /api/dashboard
 */

// Protected routes
router.get('/overview', authenticate, dashboardController.getOverview);
router.get('/analytics', authenticate, dashboardController.getAnalytics);

// Admin only
router.get('/admin', authenticate, authorize('admin'), dashboardController.getAdminOverview);

// Doctor only
router.get('/doctor', authenticate, authorize('doctor'), dashboardController.getDoctorOverview);

module.exports = router;
