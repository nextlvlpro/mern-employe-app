import { Employee } from '../models/Employee.js';
import { logActivity } from '../utils/activityLogger.js';

const ownedEmployeeQuery = (req, extra = {}) => {
  if (req.user.role === 'admin') {
    return extra;
  }

  return { ...extra, createdBy: req.user._id };
};

const getSortQuery = (sort = 'newest') => {
  if (sort === 'name') {
    return { name: 1 };
  }

  if (sort === 'department') {
    return { department: 1, name: 1 };
  }

  if (sort === 'oldest') {
    return { createdAt: 1 };
  }

  return { createdAt: -1 };
};

const allowedStatuses = ['Active', 'On Leave', 'Inactive'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{7,20}$/;

const cleanEmployeeInput = (employee) => ({
  name: String(employee.name || '').trim(),
  email: String(employee.email || '').trim().toLowerCase(),
  phone: String(employee.phone || '').trim(),
  department: String(employee.department || '').trim(),
  jobTitle: String(employee.jobTitle || '').trim(),
  status: String(employee.status || 'Active').trim()
});

const validateEmployeeInput = (employee) => {
  const errors = [];

  if (!employee.name) {
    errors.push('Name is required');
  }

  if (!emailPattern.test(employee.email)) {
    errors.push('Valid email is required');
  }

  if (!phonePattern.test(employee.phone)) {
    errors.push('Valid phone number is required');
  }

  if (!employee.department) {
    errors.push('Department is required');
  }

  if (!employee.jobTitle) {
    errors.push('Job title is required');
  }

  if (!allowedStatuses.includes(employee.status)) {
    errors.push('Status must be Active, On Leave, or Inactive');
  }

  return errors;
};

export const getEmployees = async (req, res, next) => {
  try {
    const {
      search = '',
      status = '',
      department = '',
      sort = 'newest',
      page = '',
      limit = ''
    } = req.query;
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

    if (department) {
      filters.department = department;
    }

    const employeeQuery = ownedEmployeeQuery(req, filters);
    const shouldPaginate = page || limit;

    if (!shouldPaginate) {
      const employees = await Employee.find(employeeQuery)
        .populate('createdBy', 'name email role')
        .sort(getSortQuery(sort));

      return res.json(employees);
    }

    const currentPage = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 10, 1), 50);
    const total = await Employee.countDocuments(employeeQuery);
    const employees = await Employee.find(employeeQuery)
      .populate('createdBy', 'name email role')
      .sort(getSortQuery(sort))
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    return res.json({
      data: employees,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        pages: Math.max(Math.ceil(total / pageSize), 1)
      }
    });
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
    const employeeInput = cleanEmployeeInput(req.body);
    const errors = validateEmployeeInput(employeeInput);

    if (errors.length) {
      return res.status(400).json({ message: errors.join(', ') });
    }

    const employee = await Employee.create({
      ...employeeInput,
      createdBy: req.user._id
    });

    await logActivity({
      action: 'employee_created',
      message: `${req.user.name} added ${employee.name}`,
      entityType: 'Employee',
      entityId: employee._id,
      user: req.user._id
    });

    return res.status(201).json(employee);
  } catch (error) {
    return next(error);
  }
};

export const bulkCreateEmployees = async (req, res, next) => {
  try {
    const employees = Array.isArray(req.body.employees) ? req.body.employees : [];

    if (!employees.length) {
      return res.status(400).json({ message: 'Employees array is required' });
    }

    if (employees.length > 200) {
      return res.status(400).json({ message: 'You can import up to 200 employees at a time' });
    }

    const existingEmployees = await Employee.find(ownedEmployeeQuery(req)).select('email');
    const existingEmails = new Set(existingEmployees.map((employee) => employee.email.toLowerCase()));
    const fileEmails = new Set();
    const validEmployees = [];
    const rowErrors = [];

    employees.forEach((employee, index) => {
      const rowNumber = index + 2;
      const cleanedEmployee = cleanEmployeeInput(employee);
      const errors = validateEmployeeInput(cleanedEmployee);

      if (fileEmails.has(cleanedEmployee.email)) {
        errors.push('Duplicate email in CSV');
      }

      if (existingEmails.has(cleanedEmployee.email)) {
        errors.push('Employee email already exists');
      }

      if (cleanedEmployee.email) {
        fileEmails.add(cleanedEmployee.email);
      }

      if (errors.length) {
        rowErrors.push({ row: rowNumber, email: cleanedEmployee.email, errors });
        return;
      }

      validEmployees.push({
        ...cleanedEmployee,
        createdBy: req.user._id
      });
    });

    const createdEmployees = validEmployees.length
      ? await Employee.insertMany(validEmployees, { ordered: false })
      : [];

    if (createdEmployees.length) {
      await logActivity({
        action: 'employees_imported',
        message: `${req.user.name} imported ${createdEmployees.length} employees`,
        entityType: 'Import',
        user: req.user._id
      });
    }

    return res.status(201).json({
      created: createdEmployees.length,
      skipped: rowErrors.length,
      errors: rowErrors
    });
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
    await logActivity({
      action: 'employee_updated',
      message: `${req.user.name} updated ${updatedEmployee.name}`,
      entityType: 'Employee',
      entityId: updatedEmployee._id,
      user: req.user._id
    });

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

    const deletedName = employee.name;
    await employee.deleteOne();
    await logActivity({
      action: 'employee_deleted',
      message: `${req.user.name} deleted ${deletedName}`,
      entityType: 'Employee',
      entityId: employee._id,
      user: req.user._id
    });

    return res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
