import express from 'express';
import { getRecordings, getRecordingById} from '../controllers/recording.controller.js';

const router = express.Router();

// Recording routes
router.get('/', getRecordings);
router.get('/:id', getRecordingById);


export default router;
