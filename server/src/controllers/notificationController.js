const notificationService = require('../services/notificationService');
const ApiResponse = require('../utils/apiResponse');

exports.createNotification = async (req, res, next) => {
  try {
    const io = req.app.get('io');
    const notification = await notificationService.createNotification(req.body, io);
    res.status(201).json(new ApiResponse(201, 'Notification created successfully', notification));
  } catch (error) {
    next(error);
  }
};

exports.getUserNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user._id);
    res.status(200).json(new ApiResponse(200, 'Notifications retrieved', notifications));
  } catch (error) {
    next(error);
  }
};

exports.getUnreadNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUnreadNotifications(req.user._id);
    res.status(200).json(new ApiResponse(200, 'Unread notifications retrieved', notifications));
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, 'Notification marked as read', notification));
  } catch (error) {
    next(error);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    await notificationService.markAllAsRead(req.user._id);
    res.status(200).json(new ApiResponse(200, 'All notifications marked as read'));
  } catch (error) {
    next(error);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    await notificationService.deleteNotification(req.params.id);
    res.status(200).json(new ApiResponse(200, 'Notification deleted'));
  } catch (error) {
    next(error);
  }
};
