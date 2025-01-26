import express from "express";
import shoppingCartController from "../controllers/shoppingCart-controller.js";

const router = express.Router();

router.get("/", shoppingCartController.getAllShoppingCarts);
router.get("/:id", shoppingCartController.getShoppingCartById);
router.post("/", shoppingCartController.createShoppingCart);
router.put("/:id", shoppingCartController.updateShoppingCart);
router.delete("/:id", shoppingCartController.destroyShoppingCart);

export default router;
