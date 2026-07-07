const express = require('express');
const profileController = require('../controllers/profileController');
const { updateProfileValidation, updatePasswordValidation } = require('../validators/profileValidator');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Apply protect middleware to all profile routes
router.use(protect);

router.get('/', profileController.getProfile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update basic user profile information
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 */
router.put('/', updateProfileValidation, validate, profileController.updateProfile);

/**
 * @swagger
 * /profile/update-password:
 *   patch:
 *     summary: Update user password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/update-password', updatePasswordValidation, validate, profileController.updatePassword);

/**
 * @swagger
 * /profile/upload-avatar:
 *   patch:
 *     summary: Upload and update user avatar
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/upload-avatar', upload.single('avatar'), profileController.uploadAvatar);

module.exports = router;
