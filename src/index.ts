/** Required External Modules */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import bodyParser from "body-parser";

/** Required App Modules */
import Logger from "./config/logger";

dotenv.config();

/** App Variables */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/** App Configuration */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

/** Server Activation */
app.listen(PORT, () => {
  Logger.info(`Listening on port ${PORT}`);
});
