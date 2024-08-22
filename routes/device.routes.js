import express from 'express';
import { getDevices, getDeviceById, createDevice} from '../controllers/device.controller.js';

const router = express.Router();

// Device routes
router.get('/', getDevices);
router.get('/:id', getDeviceById);
router.post('/', createDevice);


export default router;
