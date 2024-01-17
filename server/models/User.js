import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpirationDays,
  });
};
const User = mongoose.model("User", userSchema);

export default User;
