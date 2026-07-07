const express = require('express');
const adminController = require('../controllers/adminController');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Apply protect and restrictTo admin middleware to all admin routes
router.use(protect, restrictTo('admin'));

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users with pagination and filtering
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/users', adminController.getAllUsers);

/**
 * @swagger
 * /admin/users/{id}/status:
 *   patch:
 *     summary: Activate or deactivate a user account
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/users/:id/status', adminController.updateUserStatus);

/**
 * @swagger
 * /admin/doctors/{id}/verify:
 *   patch:
 *     summary: Verify or unverify a doctor profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/doctors/:id/verify', adminController.verifyDoctor);

module.exports = router;
