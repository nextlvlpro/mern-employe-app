import { User } from '../models/User.js';
import { logActivity } from '../utils/activityLogger.js';

export const getUsers = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { department: req.user.department };
    const users = await User.find(query)
      .select('name email role department createdAt')
      .sort({ createdAt: -1 });

    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    if (!['admin', 'department_head'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Only admins and department heads can add users' });
    }

    const { name, email, password } = req.body;
    let { role = 'user', department = 'General' } = req.body;
    department = String(department || 'General').trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (!['admin', 'department_head', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (req.user.role === 'department_head') {
      role = 'user';
      department = req.user.department;
    }

    if (!department) {
      return res.status(400).json({ message: 'Department is required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const createdUser = await User.create({ name, email, password, role, department });

    await logActivity({
      action: 'user_role_updated',
      message: `${req.user.name} added ${createdUser.name} as ${role}`,
      entityType: 'User',
      entityId: createdUser._id,
      user: req.user._id
    });

    return res.status(201).json({
      id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      department: createdUser.department
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!['admin', 'department_head', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Role must be admin, department_head, or user' });
    }

    if (String(req.user._id) === req.params.id && role !== 'admin') {
      return res.status(400).json({ message: 'You cannot remove your own admin access' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    if (req.body.department !== undefined) {
      const department = String(req.body.department).trim();
      if (!department) {
        return res.status(400).json({ message: 'Department is required' });
      }
      user.department = department;
    }
    await user.save();

    await logActivity({
      action: 'user_role_updated',
      message: `${req.user.name} changed ${user.name} to ${role}`,
      entityType: 'User',
      entityId: user._id,
      user: req.user._id
    });

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department
    });
  } catch (error) {
    return next(error);
  }
};
