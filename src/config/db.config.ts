import mongoose from "mongoose";
import envConfig from "./env.config";

const mongoUri = envConfig.getString("MONGO_URI");

const connectDB = async () => {
  await mongoose.connect(mongoUri, {
    autoCreate: true,
  });
  console.log("MongoDb Connected");
};
export default connectDB;
