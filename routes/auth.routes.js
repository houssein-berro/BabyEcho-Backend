import express from 'express';
import { registerUser, loginUser, validateToken } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/validate', authMiddleware, validateToken);

export default router;
