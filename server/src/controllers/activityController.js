import { ActivityLog } from '../models/ActivityLog.js';

export const getActivityLogs = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id };
    const limit = Math.min(Number(req.query.limit) || 50, 100);

    const logs = await ActivityLog.find(query)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.json(logs);
  } catch (error) {
    return next(error);
  }
};
