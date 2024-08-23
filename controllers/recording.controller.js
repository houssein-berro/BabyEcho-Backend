import Recording from '../models/recording.model.js';
import User from '../models/user.model.js';

// Create recording
export const createRecording = async (req, res) => {
  const { userId, babyId, duration, recordingURL } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const babyExists = user.babies._id(babyId);
    if (!babyExists) {
      return res.status(404).json({ message: "Baby not found in user's profile" });
    }

    const newRecording = new Recording({
      userId,
      babyId,
      duration,
      recordingURL
    });

    await newRecording.save();
    res.status(201).json(newRecording);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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