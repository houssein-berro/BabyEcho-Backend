import express from 'express';
import {
  getRecordings,
  getRecordingById,
  saveRecording,
  updateRecording,
  deleteRecording,
} from '../controllers/recording.controller.js';

const router = express.Router();

router.get('/', getRecordings);
router.get('/:id', getRecordingById);
router.put('/:id', updateRecording);
router.delete('/:id', deleteRecording);
router.post('/', saveRecording);

export default router;
