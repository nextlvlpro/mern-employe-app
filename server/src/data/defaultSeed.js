import { ActivityLog } from '../models/ActivityLog.js';
import { AppSetting } from '../models/AppSetting.js';
import { Employee } from '../models/Employee.js';
import { User } from '../models/User.js';

const seedKey = 'default_seed_completed';

const demoUsers = [
  {
    name: 'Bhanu Sharma',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    department: 'Management'
  },
  {
    name: 'Engineering Head',
    email: 'head@example.com',
    password: 'password123',
    role: 'department_head',
    department: 'Engineering'
  },
  {
    name: 'Demo Staff',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
    department: 'Support'
  }
];

const demoEmployees = [
  {
    name: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    phone: '9876543210',
    department: 'Engineering',
    jobTitle: 'Frontend Developer',
    status: 'Active',
    ownerEmail: 'admin@example.com'
  },
  {
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    phone: '9876543211',
    department: 'Human Resources',
    jobTitle: 'HR Executive',
    status: 'Active',
    ownerEmail: 'admin@example.com'
  },
  {
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '9876543212',
    department: 'Finance',
    jobTitle: 'Accounts Manager',
    status: 'On Leave',
    ownerEmail: 'admin@example.com'
  },
  {
    name: 'Nisha Kapoor',
    email: 'nisha.kapoor@example.com',
    phone: '9876543213',
    department: 'Support',
    jobTitle: 'Support Associate',
    status: 'Active',
    ownerEmail: 'user@example.com'
  }
];

export async function seedDefaultData({ once = true } = {}) {
  let usersCreated = 0;
  let employeesCreated = 0;
  const usersByEmail = {};

  for (const demoUser of demoUsers) {
    let user = await User.findOne({ email: demoUser.email });

    if (!user) {
      user = await User.create(demoUser);
      usersCreated += 1;
    } else if (!user.department || user.department === 'General') {
      user.department = demoUser.department;
      await user.save();
    }

    usersByEmail[demoUser.email] = user;
  }

  for (const employee of demoEmployees) {
    const existingEmployee = await Employee.findOne({ email: employee.email });
    const owner = usersByEmail[employee.ownerEmail] || usersByEmail['admin@example.com'];

    if (!existingEmployee) {
      await Employee.create({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        jobTitle: employee.jobTitle,
        status: employee.status,
        createdBy: owner._id
      });
      employeesCreated += 1;
    }
  }

  if (employeesCreated || usersCreated) {
    await ActivityLog.create({
      action: 'employees_imported',
      message: `System seeded ${usersCreated} demo users and ${employeesCreated} demo employees`,
      entityType: 'Import',
      user: usersByEmail['admin@example.com']._id
    });
  }

  await AppSetting.findOneAndUpdate(
    { key: seedKey },
    {
      value: {
        lastCheckedAt: new Date().toISOString(),
        usersCreated,
        employeesCreated,
        mode: once ? 'startup' : 'manual'
      }
    },
    { upsert: true, new: true }
  );

  console.log(`Default seed checked. Users created: ${usersCreated}. Employees created: ${employeesCreated}.`);
  return { skipped: false, usersCreated, employeesCreated };
}
