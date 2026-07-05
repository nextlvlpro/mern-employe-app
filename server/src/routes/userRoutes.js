import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { getUsers, updateUserRole } from '../controllers/userController.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.patch('/:id/role', updateUserRole);

export default router;
