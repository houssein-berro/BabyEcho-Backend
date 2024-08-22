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

// Basic CRUD operations
router.get('/', getAllUsers);                
router.get('/:id', getUserById);             
router.put('/:id', updateUser);              
router.delete('/:id', deleteUser);                

router.post('/', register);                
router.post('/login', login);                 


export default router;
