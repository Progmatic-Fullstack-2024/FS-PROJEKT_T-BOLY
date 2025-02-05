import express from "express";
import productsController from "../controllers/products-controller.js";
import authenticate from "../middlewares/auth-middleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/export", productsController.exportProducts);

router.get(
  "/category/:categoryId",
  productsController.getAllProductsByCategory,
  productsController.getAllProductsByCategory,
);
router.get("/:id", productsController.getProductById);

router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "moreImages", maxCount: 10 },
  ]),
  authenticate,
  productsController.createProduct,
);

router.put(
  "/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "moreImages", maxCount: 10 },
  ]),
  authenticate,
  productsController.updateProduct,
);

router.delete("/:id", authenticate, productsController.destroyProduct);

export default router;
