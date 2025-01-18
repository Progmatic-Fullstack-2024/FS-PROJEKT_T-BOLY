import express from "express";
import productsController from "../controllers/products-controller.js";
import { authenticate, authorize } from "../middlewares/auth-middleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/export", productsController.exportProducts);

router.get(
  "/category/:categoryId",
  productsController.getAllProductsByCategory
);
router.get("/:id", productsController.getProductById);

router.post(
  "/",
  upload.single("file"),
  authenticate,
  authorize(["ADMIN"]),
  productsController.createProduct
);

router.put(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  productsController.updateProduct
);

router.delete(
  "/:id",
  authenticate,
  // authorize(["ADMIN"]),
  productsController.destroyProduct
);

export default router;
