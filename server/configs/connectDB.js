/*import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log(console.log("MONGODB_URI from .env:", process.env.MONGODB_URI)));
    await mongoose.connect(`$process.env.MONGO_URI}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDB;*/

import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    //console.log( process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

export default connectDB;

