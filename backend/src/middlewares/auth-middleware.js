import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || token === "undefined") {
    next(new HttpError("Token is missing", 401));
  }
  try {
    const userDecoded = jwt.verify(token, JWT_SECRET);
    req.user = userDecoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (requiredRoles) => {
  return (req, res, next) => {
    console.log(req.user);
    const { role } = req.user;

    if (!requiredRoles.includes(role)) {
      next(new HttpError("Unathorized", 403));
    } else {
      next();
    }
  };
};
