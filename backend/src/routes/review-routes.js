import express from "express";
import productReviewController from "../controllers/product-review-controller.js";

const router = express.Router();

router.post("/", productReviewController.createReview);

router.get("/:id", productReviewController.listAllReviewByProduct);

router.get(
  "/hasreviewed/:userId/:productId",
  productReviewController.checkUserReview,
);

export default router;
