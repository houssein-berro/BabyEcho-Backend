import path from 'path';
import multer from 'multer';
import Recording from '../models/recording.model.js';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 } // Limit file size to 10MB (adjust as needed)
}).single('audioFile'); // Expect a single file upload with the field name 'audioFile'

export const saveRecording = (req, res) => {
  // Handle the file upload
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).send('Multer error occurred during upload.');
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).send('Unknown error occurred during upload.');
    }

    // No file uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Proceed with saving the recording details to the database
    try {
      const newRecording = new Recording({
        userId: req.body.userId, // Ensure 'userId' is provided by the client
        babyId: req.body.babyId, // Ensure 'babyId' is provided by the client
        recordingURL: req.file.path, // Save the path of the uploaded file
        duration: req.body.duration // Optional: save the duration if provided
      });

      await newRecording.save();

      res.status(201).send('Recording saved successfully.');
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
export const getRecordingById = async (req, res) => {
  const { id } = req.params;

  try {
    const recording = await Recording.findById({ userId: id });
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.json(recording);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
