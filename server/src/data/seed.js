import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { Employee } from '../models/Employee.js';
import { User } from '../models/User.js';

dotenv.config();

const runSeed = async () => {
  await connectDB();

  await User.deleteMany({});
  await Employee.deleteMany({});

  const admin = await User.create({
    name: 'Bhanu Sharma',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  });

  await Employee.insertMany([
    {
      name: 'Aarav Mehta',
      email: 'aarav.mehta@example.com',
      phone: '9876543210',
      department: 'Engineering',
      jobTitle: 'Frontend Developer',
      status: 'Active',
      createdBy: admin._id
    },
    {
      name: 'Priya Nair',
      email: 'priya.nair@example.com',
      phone: '9876543211',
      department: 'Human Resources',
      jobTitle: 'HR Executive',
      status: 'Active',
      createdBy: admin._id
    },
    {
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '9876543212',
      department: 'Finance',
      jobTitle: 'Accounts Manager',
      status: 'On Leave',
      createdBy: admin._id
    }
  ]);

  console.log('Seed completed. Login with admin@example.com / password123');
  process.exit(0);
};

runSeed().catch((error) => {
  console.error(error);
  process.exit(1);
});
