import express from "express";
import productCategoryController from "../controllers/product-category-controller.js";
import authenticate from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/:id", productCategoryController.getConnectionById);

router.post(
  "/",
  authenticate,
  productCategoryController.createProductCategoryConnection,
);

router.put(
  "/:id",
  authenticate,
  productCategoryController.updateProductCategoryConnection,
);

router.delete(
  "/:id",
  authenticate,
  productCategoryController.destroyConnection,
);
export default router;
