import express from "express";
import productsImagesController from "../controllers/products-images-controller.js";
import authenticate from "../middlewares/auth-middleware.js";
// import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/:id", productsImagesController.getProductImagesById);

router.put(
  "/:id",
  // upload.fields([
  //   { name: "file", maxCount: 1 },
  //   { name: "moreImages", maxCount: 10 },
  // ]),
  authenticate,
  productsImagesController.updateProductImages,
);

export default router;
