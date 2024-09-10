import path from 'path';
import { fileURLToPath } from 'url'; // Import the fileURLToPath method
import multer from 'multer';
import Recording from '../models/recording.model.js';

// Define __dirname in ES module scope
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Adjust the path as necessary
    cb(null, path.join(__dirname, '../../uploads/')); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 } 
}).single('audioFile');

// Save a recording
export const saveRecording = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).send('Multer error occurred during upload.');
    } else if (err) {
      return res.status(500).send('Unknown error occurred during upload.');
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      const newRecording = new Recording({
        userId: req.body.userId, 
        babyId: req.body.babyId, 
        recordingURL: path.join('uploads', req.file.filename),
        duration: req.body.duration
      });

      await newRecording.save();

      res.status(201).json({
        message: 'Recording saved successfully.',
        recordingId: newRecording._id,
        recordingURL: req.file.path,
      });
      } catch (error) {
      console.error('Failed to save recording:', error);
      res.status(500).send('Error saving recording.');
    }
  });
};

// Get all recordings
export const getRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find();
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single recording by ID
export const getRecordingByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const recording = await Recording.find({ userId: id });
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.json(recording);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getRecordingsByBabyId = async (req, res) => {
  try {
    const babyId = req.params.babyId;
    const recordings = await Recording.find({ babyId }).populate('userId', 'name'); 
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recordings', error });
  }
};

// Update a recording
export const updateRecording = async (req, res) => {
  const { id } = req.params;

  try {
    const recording = await Recording.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.json(recording);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a recording
export const deleteRecording = async (req, res) => {
  const { id } = req.params;

  try {
    const recording = await Recording.findByIdAndDelete(id);
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.status(204).json({ message: "Recording deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecordingAnalysis = async (req, res) => {
  const { id } = req.params;
  const { resultDetails } = req.body;

  try {
    const updatedRecording = await Recording.findByIdAndUpdate(
      id,
      {
        $set: { 'analysisResults.resultDetails': resultDetails },
      },
      { new: true }
    );

    if (!updatedRecording) {
      return res.status(404).json({ message: 'Recording not found' });
    }

    res.json(updatedRecording);
  } catch (error) {
    console.error('Error updating analysis result:', error);
    res.status(500).json({ message: 'Error updating analysis result' });
  }
};