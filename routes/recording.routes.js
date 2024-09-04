import express from 'express';
import {
  getRecordings,
  getRecordingByUserId,
  saveRecording,
  updateRecording,
  deleteRecording,
  updateRecordingAnalysis,
} from '../controllers/recording.controller.js';

const router = express.Router();

router.get('/', getRecordings);
router.get('/:id', getRecordingByUserId);
router.put('/:id', updateRecording);
router.put('/:id/analysis', updateRecordingAnalysis);
router.delete('/:id', deleteRecording);
router.post('/', saveRecording);

export default router;
