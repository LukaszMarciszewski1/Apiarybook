import mongoose from "mongoose";
import { config } from '../config/config'

export const connectDB = async () => {
  await mongoose
    .connect(config.mongo.url)
    .then(() => {
      console.log('MongoDB connected successfully')
    })
    .catch((error) => {
      console.log(`${error} Could not connect to MongoDB`)
      process.exit(1);
    })
}