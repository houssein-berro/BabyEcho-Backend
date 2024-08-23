import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, UserType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      UserType
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      UserType: newUser.UserType,
      token: generateToken(newUser)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

