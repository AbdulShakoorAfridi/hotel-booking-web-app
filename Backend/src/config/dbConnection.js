import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(env.databaseUrl);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
