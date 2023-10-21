import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/userTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB is Connected');
  } catch (error) {
    console.error('Error occurred while connecting to mongo db');
  }
};

export default connectDB;

