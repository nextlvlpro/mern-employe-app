import express from 'express';
import {
  bulkCreateEmployees,
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee
} from '../controllers/employeeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/bulk', bulkCreateEmployees);
router.route('/').get(getEmployees).post(createEmployee);
router.route('/:id').get(getEmployeeById).put(updateEmployee).delete(deleteEmployee);

export default router;
