import express from 'express';
import { getRecordings, getRecordingById, createRecording, updateRecording, deleteRecording } from '../controllers/recording.controller.js';

const router = express.Router();

// Recording routes
router.get('/', getRecordings);
router.get('/:id', getRecordingById);
router.post('/', createRecording);
router.put('/:id', updateRecording);
router.delete('/:id', deleteRecording);

export default router;
