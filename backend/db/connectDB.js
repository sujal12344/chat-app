import mongoose, { connect } from "mongoose";
import dotenv, { config } from "dotenv";
config(dotenv);

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error(`Erro while connecting MongoDB, Error: `, error);
    process.exit(1);
  }
};
