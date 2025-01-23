import HttpError from "../utils/HttpError.js";

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return next(new HttpError("Admin access only", 403));
  }
  return next();
};

export default adminMiddleware;
