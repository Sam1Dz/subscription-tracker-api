import Mongoose from 'mongoose';
import { DB_URL } from '../config/env';

const connectWithRetry = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await Mongoose.connect(DB_URL, { connectTimeoutMS: 10000 });
      console.info('Connected to database successfully');
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i < retries - 1) await new Promise((res) => setTimeout(res, delay));
      else throw error;
    }
  }
};

const connectDB = async () => {
  try {
    await connectWithRetry();
  } catch (error) {
    console.error('Error connecting to database: ', error);
    process.exit(1);
  }
};

export default connectDB;
