import mongoose from 'mongoose';
const { Schema } = mongoose;

const deviceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceType: String,
  deviceName: String,
  connectionStatus: String,
  lastConnected: Date
});

const Device = mongoose.model('Device', deviceSchema);
export default Device;
