import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB is Connected');
  } catch (error) {
    console.error('Error occurred while connecting to mongo db');
  }
};

export default connectDB;

