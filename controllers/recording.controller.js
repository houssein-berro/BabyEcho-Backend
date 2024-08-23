import Recording from "../models/recording.model.js";
import User from "../models/user.model.js";

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
      return res
        .status(404)
        .json({ message: "Baby not found in user's profile" });
    }

    const newRecording = new Recording({
      userId,
      babyId,
      duration,
      recordingURL,
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

// Get a single recording by ID
export const getRecordingById = async (req, res) => {
  const { id } = req.params;

  try {
    const recording = await Recording.findById(id);
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
    const recording = await Recording.findByIdAndUpdate(id, req.body, { new: true });
    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
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
      return res.status(404).json({ message: 'Recording not found' });
    }
    res.status(204).json({ message: 'Recording deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};