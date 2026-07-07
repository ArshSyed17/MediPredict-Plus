const adminService = require('../services/adminService');
const ApiResponse = require('../utils/apiResponse');

exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await adminService.getAllUsers(req.query);
    res.status(200).json(new ApiResponse(200, 'Users retrieved successfully', result));
  } catch (error) {
    next(error);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).json(new ApiResponse(400, 'isActive must be a boolean', null));
    }
    const user = await adminService.updateUserStatus(req.params.id, isActive);
    res.status(200).json(new ApiResponse(200, 'User status updated successfully', user));
  } catch (error) {
    next(error);
  }
};

exports.verifyDoctor = async (req, res, next) => {
  try {
    const { isVerified } = req.body;
    if (typeof isVerified !== 'boolean') {
      return res.status(400).json(new ApiResponse(400, 'isVerified must be a boolean', null));
    }
    const doctor = await adminService.verifyDoctor(req.params.id, isVerified);
    res.status(200).json(new ApiResponse(200, 'Doctor verification status updated', doctor));
  } catch (error) {
    next(error);
  }
};
