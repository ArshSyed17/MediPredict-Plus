const activityLogService = require('../services/activityLogService');
const ApiResponse = require('../utils/apiResponse');

exports.getAllLogs = async (req, res, next) => {
  try {
    const logs = await activityLogService.getAllLogs(req.query);
    res.status(200).json(new ApiResponse(200, 'Activity logs retrieved', logs));
  } catch (error) {
    next(error);
  }
};

exports.getMyLogs = async (req, res, next) => {
  try {
    const logs = await activityLogService.getUserLogs(req.user._id);
    res.status(200).json(new ApiResponse(200, 'Your recent activity logs', logs));
  } catch (error) {
    next(error);
  }
};
