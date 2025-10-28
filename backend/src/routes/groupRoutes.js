import express from 'express';
import { protect } from '../middleware/auth.js'; //  Import protect
import {
  createGroup,
  getUserGroups,
  getGroupById,
  addMember,
  removeMember,
  updateGroup,
  leaveGroup,
  deleteGroup

} from '../controllers/groupController.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/create', createGroup);
router.get('/user', getUserGroups);
router.get('/:id', getGroupById);
router.post('/add-member', addMember);
router.post('/remove-member', removeMember);
router.put('/update', updateGroup);
router.post('/leave', leaveGroup);
router.delete('/delete', deleteGroup);
export default router;
