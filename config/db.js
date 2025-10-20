import mongoose from "mongoose";
import { toast } from 'react-hot-toast';


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongodb ");
  } catch (err) {
    toast.error(err);
  }
};

export default connectDB;
