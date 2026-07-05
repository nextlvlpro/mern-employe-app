import { User } from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

const toAuthResponse = (user) => ({
  token: generateToken(user),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password, adminCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const role = adminCode && adminCode === process.env.ADMIN_INVITE_CODE ? 'admin' : 'user';
    const user = await User.create({ name, email, password, role });

    return res.status(201).json(toAuthResponse(user));
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json(toAuthResponse(user));
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res) => {
  return res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) {
      const cleanName = String(name).trim();

      if (!cleanName) {
        return res.status(400).json({ message: 'Name is required' });
      }

      user.name = cleanName;
    }

    if (password) {
      if (String(password).length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      user.password = password;
    }

    await user.save();

    return res.json(toAuthResponse(user));
  } catch (error) {
    return next(error);
  }
};
