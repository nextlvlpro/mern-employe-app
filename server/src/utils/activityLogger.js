import { ActivityLog } from '../models/ActivityLog.js';

export async function logActivity({ action, message, entityType, entityId, user }) {
  await ActivityLog.create({
    action,
    message,
    entityType,
    entityId,
    user
  });
}
