import express from 'express';
import { getDevicesByUser, getDeviceById, addDevice, updateDevice, deleteDevice } from '../controllers/device.controller.js';

const router = express.Router();

router.get('/', getDevicesByUser);
router.get('/:id', getDeviceById);
router.post('/', addDevice);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

export default router;