import { Employee } from '../models/Employee.js';

const ownedEmployeeQuery = (req, extra = {}) => {
  if (req.user.role === 'admin') {
    return extra;
  }

  return { ...extra, createdBy: req.user._id };
};

export const getEmployees = async (req, res, next) => {
  try {
    const { search = '', status = '' } = req.query;
    const filters = {};

    if (search.trim()) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      filters.status = status;
    }

    const employees = await Employee.find(ownedEmployeeQuery(req, filters))
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });

    return res.json(employees);
  } catch (error) {
    return next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findOne(ownedEmployeeQuery(req, { _id: req.params.id }));

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.json(employee);
  } catch (error) {
    return next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, phone, department, jobTitle, status } = req.body;

    if (!name || !email || !phone || !department || !jobTitle) {
      return res.status(400).json({
        message: 'Name, email, phone, department, and job title are required'
      });
    }

    const employee = await Employee.create({
      name,
      email,
      phone,
      department,
      jobTitle,
      status,
      createdBy: req.user._id
    });

    return res.status(201).json(employee);
  } catch (error) {
    return next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne(ownedEmployeeQuery(req, { _id: req.params.id }));

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const allowedFields = ['name', 'email', 'phone', 'department', 'jobTitle', 'status'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        employee[field] = req.body[field];
      }
    });

    const updatedEmployee = await employee.save();
    return res.json(updatedEmployee);
  } catch (error) {
    return next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne(ownedEmployeeQuery(req, { _id: req.params.id }));

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.deleteOne();
    return res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
