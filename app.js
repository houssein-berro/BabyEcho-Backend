import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes.js';
import recordingRoutes from './routes/recording.routes.js';
import deviceRoutes from './routes/device.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true })); 

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB connected successfully.');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    app.use('/api/users', userRoutes);
    app.use('/api/recordings', recordingRoutes);
    app.use('/api/devices', deviceRoutes);
 
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));
