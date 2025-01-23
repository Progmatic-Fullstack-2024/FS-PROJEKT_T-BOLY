import express from "express";
import productCategoryController from "../controllers/product-category-controller.js";
import { authenticate, authorize } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/:id", productCategoryController.getConnectionById);

router.post(
  "/",
  authenticate,
  authorize(["ADMIN"]),
  productCategoryController.createProductCategoryConnection,
);

router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  productCategoryController.updateProductCategoryConnection,
);

router.delete(
  "/:productId",
  authenticate,
  authorize(["ADMIN"]),
  productCategoryController.destroyConnection,
);

export default router;
