import express from 'express';
import {
  getAllUsers,
  searchUsers,
  getUserById,
  updateProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect)
router.get('/all', getAllUsers);
router.get('/search', searchUsers);
router.get('/:id', getUserById);
router.put('/:userId', updateProfile);

export default router;
