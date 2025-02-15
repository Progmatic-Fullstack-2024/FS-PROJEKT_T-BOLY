import express from "express";
import statisticsController from "../controllers/statistics-controller.js";

const router = express.Router();

router.get("/admin", statisticsController.getAdminStatistics);
router.get("/", statisticsController.getStatistics);

export default router;
