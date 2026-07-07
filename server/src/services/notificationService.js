const notificationRepository = require('../repositories/notificationRepository');
const ApiError = require('../utils/apiError');

class NotificationService {
  async createNotification(notificationData, io = null) {
    const notification = await notificationRepository.create(notificationData);

    // If socket.io instance is provided, emit real-time notification
    if (io) {
      io.to(notificationData.user.toString()).emit('newNotification', notification);
    }

    return notification;
  }

  async getUserNotifications(userId) {
    return await notificationRepository.findByUserId(userId);
  }

  async getUnreadNotifications(userId) {
    return await notificationRepository.findUnreadByUserId(userId);
  }

  async markAsRead(notificationId, userId) {
    const notification = await notificationRepository.markAsRead(notificationId);
    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }
    return notification;
  }

  async markAllAsRead(userId) {
    await notificationRepository.markAllAsRead(userId);
    return true;
  }

  async deleteNotification(notificationId) {
    const notification = await notificationRepository.deleteById(notificationId);
    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }
    return true;
  }
}

module.exports = new NotificationService();
