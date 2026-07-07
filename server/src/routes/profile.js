const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middlewares/auth');
const { userValidation } = require('../middlewares/validate');

/**
 * Profile Routes
 * Base path: /api/user
 */

// Protected routes
router.get('/profile', authenticate, profileController.getProfile);
router.patch('/profile', authenticate, userValidation.updateProfile, profileController.updateProfile);
router.post('/change-password', authenticate, userValidation.changePassword, profileController.changePassword);
router.delete('/account', authenticate, profileController.deleteAccount);
router.post('/avatar', authenticate, profileController.uploadAvatar);

module.exports = router;
