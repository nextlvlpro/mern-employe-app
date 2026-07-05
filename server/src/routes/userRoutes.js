import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { createUser, getUsers, updateUserRole } from '../controllers/userController.js';

const router = express.Router();

router.use(protect);

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id/role', authorize('admin'), updateUserRole);

export default router;
