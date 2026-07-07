const activityLogRepository = require('../repositories/activityLogRepository');

class ActivityLogService {
  /**
   * Logs a user action for auditing purposes
   * @param {Object} logData - { user, action, ipAddress, userAgent, metadata }
   */
  async logAction(logData) {
    try {
      // We don't await this or throw errors from here usually in production
      // to avoid blocking the main request cycle, but we'll return it here for completeness
      return await activityLogRepository.create(logData);
    } catch (error) {
      console.error('Failed to write activity log:', error);
      // Fail silently to not disrupt user flows
    }
  }

  async getUserLogs(userId) {
    return await activityLogRepository.findByUserId(userId);
  }

  async getAllLogs(query) {
    return await activityLogRepository.findAll(query);
  }
}

module.exports = new ActivityLogService();
