const dashboardService = require('../services/dashboardService');
const ApiResponse = require('../utils/apiResponse');

exports.getDashboardData = async (req, res, next) => {
  try {
    let dashboardData = {};

    switch (req.user.role) {
      case 'patient':
        dashboardData = await dashboardService.getPatientDashboard(req.user._id);
        break;
      case 'doctor':
        dashboardData = await dashboardService.getDoctorDashboard(req.user._id);
        break;
      case 'admin':
        dashboardData = await dashboardService.getAdminDashboard();
        break;
      default:
        dashboardData = {};
    }

    res.status(200).json(new ApiResponse(200, `${req.user.role} dashboard retrieved successfully`, dashboardData));
  } catch (error) {
    next(error);
  }
};
