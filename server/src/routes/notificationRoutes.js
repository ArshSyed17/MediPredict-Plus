const express = require('express');
const notificationController = require('../controllers/notificationController');
const { createNotificationValidation } = require('../validators/notificationValidator');
const validate = require('../middlewares/validate');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Apply protect middleware to all notification routes
router.use(protect);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications for the logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', notificationController.getUserNotifications);

/**
 * @swagger
 * /notifications/unread:
 *   get:
 *     summary: Get all unread notifications for the logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.get('/unread', notificationController.getUnreadNotifications);

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark a specific notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id/read', notificationController.markAsRead);

/**
 * @swagger
 * /notifications/read-all:
 *   patch:
 *     summary: Mark all notifications as read for the logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/read-all', notificationController.markAllAsRead);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', notificationController.deleteNotification);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a notification (Admin only, used for systemic alerts)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', restrictTo('admin'), createNotificationValidation, validate, notificationController.createNotification);

module.exports = router;
