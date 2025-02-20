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
import couponsRoutes from "./coupons-routes.js";
import orderRoutes from "./order-routes.js";
import statisticsRoutes from "./statistics-routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/coupons", couponsRoutes);
router.use("/payment", paymentRoutes);
router.use("/products", productsRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/productReview", reviewRoutes);
router.use("/images", productImagesRoutes);
router.use("/statistics", statisticsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/shoppingCart", shoppingCartRoutes);
router.use("/productCategoryConnection", productCategoryConnection);

export default router;
