import mongoose from "mongoose";
import analysisResultSchema from "./schemas/analysisResult.schema";
const { Schema } = mongoose;


const recordingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  babyId: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
  duration: Number,
  recordingURL: { type: String, required: true },
  analysisResults: analysisResultSchema,
});

const Recording = mongoose.model("Recording", recordingSchema);
export default Recording;
