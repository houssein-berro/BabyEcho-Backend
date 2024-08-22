import express from 'express';
import { getDevices} from '../controllers/device.controller.js';

const router = express.Router();

// Device routes
router.get('/', getDevices);


export default router;
