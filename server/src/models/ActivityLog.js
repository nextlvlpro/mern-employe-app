import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ['employee_created', 'employee_updated', 'employee_deleted', 'employees_imported', 'user_role_updated']
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    entityType: {
      type: String,
      enum: ['Employee', 'User', 'Import'],
      required: true
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
