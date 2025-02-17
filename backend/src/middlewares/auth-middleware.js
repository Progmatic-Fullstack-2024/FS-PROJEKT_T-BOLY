import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";
import HttpError from "../utils/HttpError.js";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token || token === "undefined") {
    next(new HttpError("You need to login first!", 401));
  }
  try {
    const userDecoded = jwt.verify(token, JWT_SECRET);
    req.user = userDecoded;
    next();
  } catch (error) {
    next(error);
  }
};
export default authenticate;
