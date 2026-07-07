const { verifyToken } = require('../utils/jwtUtils');
const ApiError = require('../utils/apiError');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(new ApiError(401, 'You are not logged in! Please log in to get access.'));
    }

    const decoded = verifyToken(token);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new ApiError(401, 'The user belonging to this token does no longer exist.'));
    }

    if (!currentUser.isActive) {
      return next(new ApiError(401, 'This account has been deactivated.'));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Your token has expired! Please log in again.'));
    }
    return next(new ApiError(401, 'Invalid token! Please log in again.'));
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have permission to perform this action'));
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo
};
