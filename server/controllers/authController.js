import { getProfileInfo } from "../utils/googleAuth.js";
import User from "../models/User.js";
import { UnAuthorizedError, BadRequestError } from "../request-errors/index.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { sendEmail } from "../utils/emailSender.js";

const login = async (req, res) => {
  const code = req.body.code;
  const profile = await getProfileInfo(code);
  const user = await User.findOne({ email: profile.email });

  if (user == null) {
    throw new UnAuthorizedError("User does not exists");
  }
  const token = user.createJWT();
  res.json({ user, token });
};

const signup = async (req, res) => {
  const code = req.body.code;
  const profile = await getProfileInfo(code);
  const userInfo = {
    email: profile.email,
    displayName: profile.name,
    firstName: profile.given_name,
    lastName: profile?.family_name,
    image: profile.picture,
    verified: true,
  };
  const user = await User.findOne({ email: profile.email });
  if (user) {
    throw new BadRequestError("User already exists");
  }
  const newUser = await User.create(userInfo);
  const token = newUser.createJWT();
  res.status(201).json({ user: newUser, token });
};

const loginTraditional = async (req, res) => {
  const userData = req.body;
  const user = await User.findOne({ email: userData.email }).select(
    "+password"
  );

  if (!user) {
    throw new UnAuthorizedError("Invalid email");
  }

  if (!user.verified) {
    res.json({
      message: "User is not verified",
      email: user.email,
      accountStatus: user.verified,
    });
  }
  if (!(await user.matchPassword(userData.password))) {
    throw new UnAuthorizedError("Invalid password");
  }

  user.password = undefined;
  const token = user.createJWT();
  res.json({ user, token });
};

const registerTraditional = async (req, res) => {
  const userData = req.body;
  const displayName = userData.email.split("@")[0];
  userData.displayName = displayName;
  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw new BadRequestError("User already exists");
  }

  const verificationCode = jwt.sign(
    { email: userData.email },
    config.verification_secret,
    {
      expiresIn: "30m",
    }
  );

  userData.verificationCode = verificationCode;

  const newUser = await User.create(userData);
  newUser.password = undefined;

  const body = `<p> Hello ${newUser.firstName} ${newUser.lastName},</p>
    <p>Please click on the link below to verify your account on Workout Planner</p>
    <a href="${config.client_url}verify-account/${verificationCode}">Verify Account</a>
    <br><br>

    <p>Regards,</p>
    <p>Workout Planner</p>`;

  const from = config.email.email_user;
  const to = newUser.email;
  await sendEmail(from, to, "Email Verification", body);

  res.status(201).json({
    message: "User Registered. Need to verify email",
    email: newUser.email,
    accountStatus: newUser.verified,
  });
};

const resendVerificationEmail = async (req, res) => {
  const email = req.body;

  const user = await User.findOne(email);

  if (!user) {
    throw new BadRequestError("User does not exist");
  }
  if (user.verified) {
    throw new BadRequestError("This user is already verified");
  }

  const verificationCode = jwt.sign({ email }, config.verification_secret, {
    expiresIn: "30m",
  });

  user.verificationCode = verificationCode;
  user.save();

  const body = `<p> Hello ${user.firstName} ${user.lastName},</p>
    <p>Please click on the link below to verify your account on Workout Planner</p>
    <a href="${config.client_url}verify-account/${verificationCode}">Verify Account</a>
    <br><br>

    <p>Regards,</p>
    <p>Workout Planner</p>`;

  const from = config.email.email_user;
  const to = user.email;
  await sendEmail(from, to, "Email Verification", body);
  res.json({
    message: "Verification Code successfully reset and sent",
    email: email.email,
  });
};

export {
  login,
  signup,
  loginTraditional,
  registerTraditional,
  resendVerificationEmail,
};
