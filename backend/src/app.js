import express from "express";
import apiRoutes from "./routes/api-routes.js";
import cors from "cors";
import authRoutes from "./routes/auth-routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRoutes);

app.use("/auth", authRoutes);

export default app;
