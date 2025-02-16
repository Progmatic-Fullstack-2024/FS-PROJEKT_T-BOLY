import express from "express";
import productsImagesController from "../controllers/products-images-controller.js";
import authenticate from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/:id", productsImagesController.getProductImagesById);

router.put("/:id", authenticate, productsImagesController.updateProductImages);

export default router;
