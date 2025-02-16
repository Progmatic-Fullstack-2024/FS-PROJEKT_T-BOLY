import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api-routes.js";
import authRoutes from "./routes/auth-routes.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
import HttpError from "./utils/HttpError.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  next(new HttpError("The page you are looking for does not exist", 404));
});

app.use(errorHandler);

export default app;
