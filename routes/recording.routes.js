import express from 'express';
import { getRecordings, getRecordingById, createRecording} from '../controllers/recording.controller.js';

const router = express.Router();

// Recording routes
router.get('/', getRecordings);
router.get('/:id', getRecordingById);
router.post('/', createRecording);

export default router;
