import Device from '../models/device.model.js';

// Add a new device
export const addDevice = async (req, res) => {
    const { userId, deviceType, deviceName, connectionStatus, lastConnected } = req.body;

    try {
        const newDevice = new Device({
            userId,
            deviceType,
            deviceName,
            connectionStatus,
            lastConnected
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
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
