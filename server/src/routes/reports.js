const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');
const { mongoIdValidation, paginationValidation } = require('../middlewares/validate');

/**
 * Report Routes
 * Base path: /api/reports
 */

// Protected routes
router.post('/', authenticate, reportController.createReport);
router.get('/', authenticate, paginationValidation, reportController.getList);
router.get('/:id', authenticate, mongoIdValidation.reportId, reportController.getDetails);
router.patch('/:id', authenticate, mongoIdValidation.reportId, reportController.updateReport);
router.patch('/:id/archive', authenticate, mongoIdValidation.reportId, reportController.archiveReport);
router.delete('/:id', authenticate, mongoIdValidation.reportId, reportController.deleteReport);

// Admin only
router.get('/admin/all', authenticate, authorize('admin'), paginationValidation, reportController.getAllReports);

module.exports = router;
