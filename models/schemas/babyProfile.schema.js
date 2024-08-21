import mongoose from 'mongoose';
const { Schema } = mongoose;

const babyProfileSchema = new Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  gender: { type: String, required: true },
  otherInfo: String 
});

export default babyProfileSchema;