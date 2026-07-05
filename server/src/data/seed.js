import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { ActivityLog } from '../models/ActivityLog.js';
import { AppSetting } from '../models/AppSetting.js';
import { Employee } from '../models/Employee.js';
import { User } from '../models/User.js';
import { seedDefaultData } from './defaultSeed.js';

dotenv.config();

const runSeed = async () => {
  await connectDB();

  await User.deleteMany({});
  await Employee.deleteMany({});
  await ActivityLog.deleteMany({});
  await AppSetting.deleteMany({});

  await seedDefaultData({ once: false });

  console.log('Seed completed. Login with admin@example.com / password123');
  process.exit(0);
};

runSeed().catch((error) => {
  console.error(error);
  process.exit(1);
});
