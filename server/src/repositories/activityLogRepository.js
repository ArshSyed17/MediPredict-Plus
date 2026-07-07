const ActivityLog = require('../models/ActivityLog');

class ActivityLogRepository {
  async create(logData) {
    return await ActivityLog.create(logData);
  }

  async findByUserId(userId, limit = 50) {
    return await ActivityLog.find({ user: userId }).sort({ createdAt: -1 }).limit(limit);
  }

  async findAll(query = {}) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (query.action) filter.action = query.action;
    if (query.userId) filter.user = query.userId;

    const logs = await ActivityLog.find(filter)
      .populate('user', 'firstName lastName email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await ActivityLog.countDocuments(filter);

    return {
      logs,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = new ActivityLogRepository();
