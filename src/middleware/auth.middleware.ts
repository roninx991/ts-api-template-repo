/** Required External Modules */
import passport from "passport";
import passportJWT from "passport-jwt";
import { CallbackError } from "mongoose";
import * as dotenv from "dotenv";

/** Required App Modules */
import Logger from "../config/logger";
import User from "../models/user";

dotenv.config();

let ExtractJwt = passportJWT.ExtractJwt;
let JWTStrategy = passportJWT.Strategy;

var params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtAuth = () => {
  let strategy = new JWTStrategy(params, function (payload, done) {
    Logger.debug("JWT Authentication using payload: ", payload);
    User.findById(payload.id, function (err: CallbackError, user: any | null) {
      if (err) {
        Logger.error("User not found!");
        Logger.error(err);
        return done(new Error("UserNotFound"), null);
      } else if (payload.expire <= Date.now()) {
        Logger.error("Token has expired!");
        return done(new Error("TokenExpired"), null);
      } else {
        Logger.info("User authentication successful!");
        return done(null, user);
      }
    });
  });
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", { session: false });
    },
  };
};
