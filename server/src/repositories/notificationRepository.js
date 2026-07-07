const Notification = require('../models/Notification');

class NotificationRepository {
  async create(notificationData) {
    return await Notification.create(notificationData);
  }

  async findByUserId(userId) {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 });
  }

  async findUnreadByUserId(userId) {
    return await Notification.find({ user: userId, isRead: false }).sort({ createdAt: -1 });
  }

  async markAsRead(id) {
    return await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
  }

  async markAllAsRead(userId) {
    return await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
  }

  async deleteById(id) {
    return await Notification.findByIdAndDelete(id);
  }
}

module.exports = new NotificationRepository();
