import express from "express";
import shoppingCartController from "../controllers/shoppingCart-controller.js";
import authenticate from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/", authenticate, shoppingCartController.getShoppingCartByUserId);
router.post("/", authenticate, shoppingCartController.addCartItem);
router.put("/", authenticate, shoppingCartController.updateCartItem);
router.delete("/", authenticate, shoppingCartController.removeCartItem);

export default router;
