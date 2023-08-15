import mongoose from "mongoose";
import envConfig from "./env.config";
import logger from "../logger";

mongoose.Promise = global.Promise;

const mongoUri = envConfig.getString("MONGO_URI");

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      autoCreate: true,
    });
    logger.info("MongoDb Connected");
  } catch (err: any) {
    logger.error(err.message);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (err: any) {
    logger.error(err.message);
    process.exit(1);
  }
};
