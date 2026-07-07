const userRepository = require('../repositories/userRepository');
const ApiError = require('../utils/apiError');
const { signToken, signRefreshToken } = require('../utils/jwtUtils');
const crypto = require('crypto');

class AuthService {
  async register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ApiError(400, 'Email already in use');
    }

    const newUser = await userRepository.create(userData);
    
    // In a real app, send verification email here
    // const verificationToken = crypto.randomBytes(32).toString('hex');
    // ... setup nodemailer ...

    const token = signToken(newUser._id, newUser.role);
    const refreshToken = signRefreshToken(newUser._id, newUser.role);

    // Remove password from output
    newUser.password = undefined;

    return { user: newUser, token, refreshToken };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    if (!user.isActive) {
      throw new ApiError(401, 'This account has been deactivated');
    }

    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id, user.role);
    const refreshToken = signRefreshToken(user._id, user.role);

    user.password = undefined;

    return { user, token, refreshToken };
  }

  async refreshTokens(user) {
    const token = signToken(user._id, user.role);
    const refreshToken = signRefreshToken(user._id, user.role);
    return { token, refreshToken };
  }
}

module.exports = new AuthService();
