import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
  try {
    console.log("inside db");

    mongoose.connect("mongodb+srv://msfarookhy:94572Saif@cluster0.gocudnr.mongodb.net/userTest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB is Connected');
  } catch (error) {
    console.error('Error occurred while connecting to mongo db');
  }
};

export default connectDB;

