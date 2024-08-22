import express from 'express';
import { getDevices, getDeviceById, createDevice, updateDevice, deleteDevice } from '../controllers/device.controller.js';

const router = express.Router();

router.get('/', getDevices);
router.get('/:id', getDeviceById);
router.post('/', createDevice);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

export default router;