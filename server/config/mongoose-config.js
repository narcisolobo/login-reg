import mongoose from 'mongoose';
import { success, error } from '../config/chalk-config.js';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const DB = process.env.DB;

async function connectToDb() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`${MONGO_URI}${DB}`, {
      retryWrites: true,
    });
    success(`Connection to ${DB} established.`);
  } catch (err) {
    error(`Something went wrong... ${err}`);
  }
}

export default connectToDb;
