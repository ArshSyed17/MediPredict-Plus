const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticate } = require('../middlewares/auth');
const { authorize } = require('../middlewares/rbac');
const { mongoIdValidation, paginationValidation } = require('../middlewares/validate');

/**
 * Doctor Routes
 * Base path: /api/doctor
 */

// Protected routes - doctor only
router.get('/profile', authenticate, authorize('doctor'), doctorController.getProfile);
router.get('/patients', authenticate, authorize('doctor'), paginationValidation, doctorController.getPatients);
router.get('/patients/:id', authenticate, authorize('doctor'), mongoIdValidation.userId, doctorController.getPatientById);
router.get('/appointments', authenticate, authorize('doctor'), paginationValidation, doctorController.getAppointments);
router.get('/analytics', authenticate, authorize('doctor'), doctorController.getAnalytics);
router.post('/notes', authenticate, authorize('doctor'), doctorController.addNote);
router.put('/notes/:id', authenticate, authorize('doctor'), mongoIdValidation.userId, doctorController.updateNote);
router.get('/export', authenticate, authorize('doctor'), doctorController.exportData);

module.exports = router;
