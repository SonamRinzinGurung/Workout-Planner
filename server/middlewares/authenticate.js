import { UnAuthorizedError } from "../request-errors/index.js";

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new UnAuthorizedError("You must be logged in to access this resource.");
};

export default isAuthenticated;
