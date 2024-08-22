import express from 'express';
import { getDevices, getDeviceById } from '../controllers/device.controller.js';

const router = express.Router();

// Device routes
router.get('/', getDevices);
router.get('/:id', getDeviceById);


export default router;
