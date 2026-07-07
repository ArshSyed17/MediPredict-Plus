const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middlewares/auth');
const { authorize, authorizePermission } = require('../middlewares/rbac');
const { mongoIdValidation, paginationValidation } = require('../middlewares/validate');

/**
 * Admin Routes
 * Base path: /api/admin
 */

// Protected routes - admin only
router.get('/profile', authenticate, authorize('admin'), adminController.getProfile);
router.get('/overview', authenticate, authorize('admin'), adminController.getOverview);
router.get('/users', authenticate, authorize('admin'), authorizePermission('user_management'), paginationValidation, adminController.getUsers);
router.get('/doctors', authenticate, authorize('admin'), authorizePermission('doctor_management'), paginationValidation, adminController.getDoctors);
router.patch('/users/:id/status', authenticate, authorize('admin'), authorizePermission('user_management'), mongoIdValidation.userId, adminController.updateUserStatus);
router.delete('/users/:id', authenticate, authorize('admin'), authorizePermission('user_management'), mongoIdValidation.userId, adminController.deleteUser);
router.patch('/doctors/:id/verify', authenticate, authorize('admin'), authorizePermission('doctor_management'), mongoIdValidation.userId, adminController.verifyDoctor);
router.get('/logs', authenticate, authorize('admin'), authorizePermission('audit_logs'), paginationValidation, adminController.getActivityLogs);
router.get('/system/health', authenticate, authorize('admin'), authorizePermission('system_settings'), adminController.getSystemHealth);
router.get('/notifications', authenticate, authorize('admin'), authorizePermission('notifications'), paginationValidation, adminController.getNotifications);
router.post('/notifications', authenticate, authorize('admin'), authorizePermission('notifications'), adminController.createNotification);
router.get('/export/:type', authenticate, authorize('admin'), authorizePermission('backup_restore'), adminController.exportData);

module.exports = router;
