const Admin = require('../models/Admin');

/**
 * Role-based access control middleware
 * Checks if user has required role
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
    }

    next();
  };
};

/**
 * Permission-based access control for admins
 * Checks if admin has required permission
 */
const authorizePermission = (permission) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.',
      });
    }

    try {
      const admin = await Admin.findOne({ user: req.user._id });

      if (!admin) {
        return res.status(403).json({
          success: false,
          message: 'Admin profile not found.',
        });
      }

      if (!admin.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Admin account is inactive.',
        });
      }

      if (!admin.permissions.includes(permission)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required permission: ${permission}`,
        });
      }

      req.admin = admin;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Permission check failed.',
        error: error.message,
      });
    }
  };
};

/**
 * Check if user is admin (any admin)
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.',
    });
  }

  next();
};

/**
 * Check if user is doctor or admin
 */
const isDoctorOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  if (!['doctor', 'admin'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Doctor or admin role required.',
    });
  }

  next();
};

/**
 * Check if user owns the resource or is admin
 */
const isOwnerOrAdmin = (userIdField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    const resourceUserId = req.params[userIdField] || req.body[userIdField];

    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }

    // User can only access their own resources
    if (req.user._id.toString() !== resourceUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.',
      });
    }

    next();
  };
};

module.exports = {
  authorize,
  authorizePermission,
  isAdmin,
  isDoctorOrAdmin,
  isOwnerOrAdmin,
};
