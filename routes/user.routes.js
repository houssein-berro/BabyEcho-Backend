import express from 'express';
import { getAllUsers, getUserById, createUser} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);


// Export the router
export default router;
