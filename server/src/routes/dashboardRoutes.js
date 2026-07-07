const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Apply protect middleware to all dashboard routes
router.use(protect);

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard data based on user role
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/', dashboardController.getDashboardData);

module.exports = router;
