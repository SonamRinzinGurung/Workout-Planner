import { UnAuthorizedError } from "../request-errors/index.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthorizedError("User is not authorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.log(error);
    throw new UnAuthorizedError("Token is not valid");
  }
};

export default isAuthenticated;
