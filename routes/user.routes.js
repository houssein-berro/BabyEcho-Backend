import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);                
router.get('/:id', getUserById);             
router.put('/:id', updateUser);              
router.delete('/:id', deleteUser);                

export default router;
