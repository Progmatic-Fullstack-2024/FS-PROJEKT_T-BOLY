import express from "express";
import categoriesRoutes from "./categories-routes.js";
import productsRoutes from "./products-routes.js";
import productCategoryConnection from "./product-category.routes.js";

const router = express.Router();

router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/productCategoryConnection", productCategoryConnection);

export default router;
