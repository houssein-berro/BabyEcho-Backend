import Device from '../models/device.model.js';

// Add a new device
export const addDevice = async (req, res) => {
  const { userId, deviceType, connectionStatus, ipAddress } = req.body;

  // Check if required fields are provided
  if (!userId || !deviceType || !ipAddress) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newDevice = new Device({
      userId,
      deviceType,
      connectionStatus,
      ipAddress,
    });

    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all devices for a user
export const getDevicesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const devices = await Device.find({ userId });
    if (devices.length === 0) {
      return res.status(404).json({ message: 'No devices found for this user' });
    }
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single device by ID
export const getDeviceById = async (req, res) => {
  const { id } = req.params;

  try {
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a device
export const updateDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const device = await Device.findByIdAndUpdate(id, req.body, { new: true });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a device
export const deleteDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const device = await Device.findByIdAndDelete(id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(204).json({ message: 'Device deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
