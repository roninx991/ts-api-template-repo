/** Required External Modules */
import { Request, Response } from "express";
import jwt from "jwt-simple";
import * as dotenv from "dotenv";
import { CallbackError } from "mongoose";

/** Required App Modules */
import Logger from "../config/logger";

dotenv.config();

export const controller = (req: Request, res: Response) => {
  // Controller logic
};

