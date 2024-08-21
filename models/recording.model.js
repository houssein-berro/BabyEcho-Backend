import mongoose from 'mongoose';
const { Schema } = mongoose;

const recordingSchema = new Schema({
  babyId: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
  duration: Number,
  recordingURL: { type: String, required: true },
  analysisResults: analysisResultSchema
});

const Recording = mongoose.model('Recording', recordingSchema);
export default Recording;
