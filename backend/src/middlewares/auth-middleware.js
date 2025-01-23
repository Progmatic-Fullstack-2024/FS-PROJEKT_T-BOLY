// auth-middleware.js

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new HttpError("Authentication token is missing", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new HttpError("Invalid token", 401));
  }
};

export default authMiddleware;
