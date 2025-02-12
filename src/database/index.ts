import Mongoose from 'mongoose';
import { DB_URL } from '../config/env';

const ConnectDB = async () => {
  try {
    if (!DB_URL) {
      throw new Error(
        'Please define the DB_URL environment variable inside .env or .env.local',
      );
    }

    await Mongoose.connect(DB_URL);
    console.info(`Connected to database successfully`);
  } catch (error) {
    console.error('Error connecting to database: ', error);
    process.exit(1);
  }
};

export default ConnectDB;
