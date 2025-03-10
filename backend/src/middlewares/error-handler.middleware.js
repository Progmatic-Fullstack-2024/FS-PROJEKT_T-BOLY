import HttpError from "../utils/HttpError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
  return next();
};
export default errorHandler;
