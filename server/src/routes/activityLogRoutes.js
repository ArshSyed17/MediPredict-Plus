const express = require('express');
const activityLogController = require('../controllers/activityLogController');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Apply protect middleware
router.use(protect);

/**
 * @swagger
 * /activity-logs/me:
 *   get:
 *     summary: Get recent activity logs for the current user
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 */
router.get('/me', activityLogController.getMyLogs);

/**
 * @swagger
 * /activity-logs:
 *   get:
 *     summary: Get all system activity logs (Admin only)
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', restrictTo('admin'), activityLogController.getAllLogs);

module.exports = router;
