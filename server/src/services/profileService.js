const userRepository = require('../repositories/userRepository');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcrypt');
const { signToken, signRefreshToken } = require('../utils/jwtUtils');

class ProfileService {
  async updateProfile(userId, updateData) {
    // Prevent updating password through this route
    if (updateData.password) {
      throw new ApiError(400, 'This route is not for password updates. Please use /update-password.');
    }

    const updatedUser = await userRepository.updateById(userId, updateData);
    if (!updatedUser) {
      throw new ApiError(404, 'User not found');
    }
    
    // Hide password if it's there
    updatedUser.password = undefined;
    return updatedUser;
  }

  async updatePassword(userId, currentPassword, newPassword) {
    const user = await userRepository.findById(userId).select('+password');
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    if (!(await user.correctPassword(currentPassword, user.password))) {
      throw new ApiError(401, 'Current password is wrong');
    }

    user.password = newPassword;
    await user.save(); // This will trigger the pre-save hook to hash the new password

    const token = signToken(user._id, user.role);
    const refreshToken = signRefreshToken(user._id, user.role);

    user.password = undefined;

    return { user, token, refreshToken };
  }

  async uploadAvatar(userId, file) {
    if (!file) {
      throw new ApiError(400, 'No image file provided');
    }

    // In a production environment, upload to Cloudinary/AWS S3 and save URL
    const fileUrl = `/uploads/${file.filename}`;

    const updatedUser = await userRepository.updateById(userId, { avatar: fileUrl });
    updatedUser.password = undefined;

    return updatedUser;
  }
}

module.exports = new ProfileService();
