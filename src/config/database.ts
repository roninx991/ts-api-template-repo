/** Required External Modules */
import mongoose from "mongoose";
import * as dotenv from "dotenv";

/** Required App Modules */
import Logger from "./logger";

dotenv.config();

/** Mongo DB Connection String */
if (!process.env.MONGODB_URI) {
  Logger.error("MONGODB_URI not available in ENV");
  process.exit(1);
}

const MONGODB_URI: string = process.env.MONGODB_URI;

const conn = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

conn
  .then(() => Logger.info("MONGODB connected successfully!"))
  .catch((e) => {
    Logger.error(e);
    process.exit(1);
  });

export default mongoose;
