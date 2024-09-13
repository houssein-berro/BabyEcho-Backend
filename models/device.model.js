import mongoose from 'mongoose';
const { Schema } = mongoose;

const deviceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceType: { type: String, required: true },  // e.g., "LED", "NoiseMaker"
  connectionStatus: {
    type: String,
    enum: ['Connected', 'Disconnected'],  // Standardize status
    default: 'Disconnected',
  },
  ipAddress: { type: String, required: true },  // Device IP address
});

const Device = mongoose.model('Device', deviceSchema);
export default Device;
