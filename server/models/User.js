import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bcrypt from "bcryptjs";

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

    password: {
      type: String,
      required: false,
      minlength: 5,
      select: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpirationDays,
  });
};
const User = mongoose.model("User", userSchema);

export default User;
