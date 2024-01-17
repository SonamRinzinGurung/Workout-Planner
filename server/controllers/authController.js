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
export { login, signup };
