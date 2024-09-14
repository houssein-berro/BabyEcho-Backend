import express from 'express';
import {
  getRecordings,
  getRecordingByUserId,
  saveRecording,
  updateRecording,
  deleteRecording,
  updateRecordingAnalysis,
  getRecordingsByBabyId
} from '../controllers/recording.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRecordings);
router.get('/:id', getRecordingByUserId);
router.put('/:id', updateRecording);
router.put('/:id/analysis', updateRecordingAnalysis);
router.delete('/:id', deleteRecording);
router.post('/', authMiddleware,saveRecording);
router.get('/baby/:babyId',getRecordingsByBabyId);

export default router;
