import express from "express";
import productsController from "../controllers/products-controller.js";

const router = express.Router();

router.get("/", productsController.getAllProducts);
router.get(
  "/category/:categoryId",
  productsController.getAllProductsByCategory,
);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.createProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.destroyProduct);

export default router;
