import express from "express";
import categoriesRoutes from "./routes/categories-routes.js";

const app = express();

app.use(express.json());

app.use("/api/categories", categoriesRoutes);

export default app;
