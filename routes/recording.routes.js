import express from 'express';
import { getRecordings} from '../controllers/recording.controller.js';

const router = express.Router();

// Recording routes
router.get('/', getRecordings);

export default router;
