import express from 'express';
import { getAllUsers, getUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Export the router
export default router;
