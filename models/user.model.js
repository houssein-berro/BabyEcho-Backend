import mongoose from "mongoose";
import babyProfileSchema from "./schemas/babyProfile.schema.js";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  babies: [babyProfileSchema],
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
});

const User = mongoose.model("User", userSchema);
export default User;
