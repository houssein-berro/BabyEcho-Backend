import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password, type } = req.body;
  console.log({ username, email, password, type });
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Use `let` instead of `const` for potential reassignment
    let newType = type;
    if (!type) newType = 'User';

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword,
      type: newType
    });

    await newUser.save();
    res.status(201).json({
      newUser,
      token: generateToken(newUser)  // Ensure generateToken is defined
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      UserType: user.UserType,
      babies: user.babies,
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Token Validation
export const validateToken = async (req, res) => {
  try {
    const user = req.user;
    console.log(req.user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
