import { ActivityLog } from '../models/ActivityLog.js';
import { AppSetting } from '../models/AppSetting.js';
import { Employee } from '../models/Employee.js';
import { User } from '../models/User.js';

const seedKey = 'default_seed_completed';

const demoAdmin = {
  name: 'Bhanu Sharma',
  email: 'admin@example.com',
  password: 'password123',
  role: 'admin'
};

const demoEmployees = [
  {
    name: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    phone: '9876543210',
    department: 'Engineering',
    jobTitle: 'Frontend Developer',
    status: 'Active'
  },
  {
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    phone: '9876543211',
    department: 'Human Resources',
    jobTitle: 'HR Executive',
    status: 'Active'
  },
  {
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '9876543212',
    department: 'Finance',
    jobTitle: 'Accounts Manager',
    status: 'On Leave'
  }
];

export async function seedDefaultData({ once = true } = {}) {
  if (once) {
    const completedSeed = await AppSetting.findOne({ key: seedKey });

    if (completedSeed) {
      console.log('Default seed already completed. Skipping startup seed.');
      return { skipped: true, usersCreated: 0, employeesCreated: 0 };
    }
  }

  let usersCreated = 0;
  let employeesCreated = 0;

  let admin = await User.findOne({ email: demoAdmin.email });

  if (!admin) {
    admin = await User.create(demoAdmin);
    usersCreated += 1;
  }

  for (const employee of demoEmployees) {
    const existingEmployee = await Employee.findOne({ email: employee.email });

    if (!existingEmployee) {
      await Employee.create({
        ...employee,
        createdBy: admin._id
      });
      employeesCreated += 1;
    }
  }

  if (employeesCreated || usersCreated) {
    await ActivityLog.create({
      action: 'employees_imported',
      message: `System seeded ${employeesCreated} demo employees`,
      entityType: 'Import',
      user: admin._id
    });
  }

  await AppSetting.findOneAndUpdate(
    { key: seedKey },
    {
      value: {
        completedAt: new Date().toISOString(),
        usersCreated,
        employeesCreated
      }
    },
    { upsert: true, new: true }
  );

  console.log(`Default seed completed. Users created: ${usersCreated}. Employees created: ${employeesCreated}.`);
  return { skipped: false, usersCreated, employeesCreated };
}
