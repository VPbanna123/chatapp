import express from 'express';
import { signup, login, logout, refreshToken, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh',refreshToken)

//protect routes
router.get('/me',protect,getCurrentUser)
export default router;
