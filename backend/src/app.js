import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import apiRoutes from "./routes/api-routes.js";
import authRoutes from "./routes/auth-routes.js";
import errorHandler from "./middlewares/error-handler.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
