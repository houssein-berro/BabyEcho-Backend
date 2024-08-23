import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);

export default router;
