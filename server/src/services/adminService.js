const userRepository = require('../repositories/userRepository');
const doctorRepository = require('../repositories/doctorRepository');
const ApiError = require('../utils/apiError');

class AdminService {
  async getAllUsers(query) {
    // Basic implementation for fetching all users with pagination/filtering
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (query.role) filter.role = query.role;
    if (query.isActive !== undefined) filter.isActive = query.isActive;

    const User = require('../models/User'); // Import here to avoid circular dependency if any
    const users = await User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await User.countDocuments(filter);

    return {
      users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async updateUserStatus(userId, isActive) {
    const user = await userRepository.updateById(userId, { isActive });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async verifyDoctor(doctorId, isVerified) {
    const doctor = await doctorRepository.updateByUserId(doctorId, { isVerified });
    if (!doctor) {
      // Find directly by doctor ID if it wasn't the User ID passed
      const docById = await doctorRepository.updateById(doctorId, { isVerified });
      if (!docById) throw new ApiError(404, 'Doctor profile not found');
      return docById;
    }
    return doctor;
  }
}

module.exports = new AdminService();
