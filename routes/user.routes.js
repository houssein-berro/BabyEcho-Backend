import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addBabyToUser
} from '../controllers/user.controller.js';
import  authMiddleware  from '../middleware/authMiddleware.js';
import doctorAuth from '../middleware/doctorAuth.js'
const router = express.Router();

router.get('/', doctorAuth ,getAllUsers);                
router.get('/:id', getUserById);             
router.put('/:id', updateUser);              
router.delete('/:id', deleteUser);                
router.post('/add-baby/:userId', authMiddleware,addBabyToUser);

export default router;
