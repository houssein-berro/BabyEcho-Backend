import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addBabyToUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);                
router.get('/:id', getUserById);             
router.put('/:id', updateUser);              
router.delete('/:id', deleteUser);                
router.post('/add-baby/:userId', addBabyToUser);

export default router;
