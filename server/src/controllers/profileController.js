const profileService = require('../services/profileService');
const ApiResponse = require('../utils/apiResponse');

exports.getProfile = async (req, res, next) => {
  try {
    res.status(200).json(new ApiResponse(200, 'Profile retrieved successfully', req.user));
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await profileService.updateProfile(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, 'Profile updated successfully', user));
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { user, token, refreshToken } = await profileService.updatePassword(req.user._id, currentPassword, newPassword);
    res.status(200).json(new ApiResponse(200, 'Password updated successfully', { user, token, refreshToken }));
  } catch (error) {
    next(error);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    const user = await profileService.uploadAvatar(req.user._id, req.file);
    res.status(200).json(new ApiResponse(200, 'Avatar updated successfully', user));
  } catch (error) {
    next(error);
  }
};
