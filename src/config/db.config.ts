import mongoose from "mongoose";
import envConfig from "./env.config";

mongoose.Promise = global.Promise;

const mongoUri = envConfig.getString("MONGO_URI");

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      autoCreate: true,
    });
    console.log("MongoDb Connected");
  } catch (err: any) {
    console.log(err.message);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
