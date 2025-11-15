import express from 'express';
import { protect } from '../middleware/auth.js'; // Import protect
import {
  sendMessage,
  getMessages,
  getGroupMessages,
  markAsRead,
  deleteMessage,
  getRecentConversations
} from '../controllers/messageController.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/send', sendMessage);
router.get('/conversation', getMessages);
router.get('/group', getGroupMessages);
router.post('/read', markAsRead);
router.delete('/delete', deleteMessage);
router.get('/recent', getRecentConversations);

export default router;
