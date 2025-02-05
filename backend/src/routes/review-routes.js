import express from "express";
import productReviewController from "../controllers/product-review-controller.js";

const router = express.Router();

router.post("/", productReviewController.createReview);

router.get("/:id", productReviewController.listAllReviewByProduct);

export default router;
