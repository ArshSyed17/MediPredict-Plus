const authService = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const { verifyToken } = require('../utils/jwtUtils');
const userRepository = require('../repositories/userRepository');
const ApiError = require('../utils/apiError');

exports.register = async (req, res, next) => {
  try {
    const { user, token, refreshToken } = await authService.register(req.body);
    
    res.status(201).json(new ApiResponse(201, 'User registered successfully', { user, token, refreshToken }));
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token, refreshToken } = await authService.login(email, password);
    
    res.status(200).json(new ApiResponse(200, 'Login successful', { user, token, refreshToken }));
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next(new ApiError(400, 'Refresh token is required'));
    }

    const decoded = verifyToken(refreshToken, true);
    const user = await userRepository.findById(decoded.id);

    if (!user || !user.isActive) {
      return next(new ApiError(401, 'Invalid refresh token or inactive user'));
    }

    const tokens = await authService.refreshTokens(user);
    
    res.status(200).json(new ApiResponse(200, 'Tokens refreshed successfully', tokens));
  } catch (error) {
    return next(new ApiError(401, 'Invalid refresh token'));
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.status(200).json(new ApiResponse(200, 'Logged out successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json(new ApiResponse(200, 'User profile retrieved', req.user));
  } catch (error) {
    next(error);
  }
};
