import mongoose from 'mongoose';
const { Schema } = mongoose;

const analysisResultSchema = new Schema({
  analysisTimestamp: { type: Date, default: Date.now }, 
  resultDetails: Schema.Types.Mixed,  
  MLModelVersion: String
});

export default analysisResultSchema;