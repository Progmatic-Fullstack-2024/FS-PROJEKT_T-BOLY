import express from "express";
import categoriesRoutes from "./categories-routes.js";
import productsRoutes from "./products-routes.js";
import productImagesRoutes from "./products-images-routes.js";
import userRoutes from "./user-routes.js";
import productCategoryConnection from "./product-category.routes.js";
import shoppingCartRoutes from "./shoppingCart-routes.js";
import wishlistRoutes from "./wishlist-routes.js";
import reviewRoutes from "./review-routes.js";
import paymentRoutes from "./payment-routes.js";


const router = express.Router();

router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/images", productImagesRoutes);
router.use("/user", userRoutes);
router.use("/productCategoryConnection", productCategoryConnection);
router.use("/shoppingCart", shoppingCartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/productReview", reviewRoutes)
router.use("/payment", paymentRoutes)

export default router;
