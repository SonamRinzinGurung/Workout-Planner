import { getProfileInfo } from "../utils/googleAuth.js";
import User from "../models/User.js";
import { UnAuthorizedError, BadRequestError } from "../request-errors/index.js";

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
  const newUser = await User.create(userData);
  newUser.password = undefined;
  const token = newUser.createJWT();
  res.status(201).json({ user: newUser, token });
};

export { login, signup, loginTraditional, registerTraditional };
