import express from "express";
import wishlistController from "../controllers/wishlist-controller.js";
import authenticate from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/", authenticate, wishlistController.getWishlistByUserId);
router.post("/", authenticate, wishlistController.addToWishlist);
router.delete("/:id", authenticate, wishlistController.removeFromWishlist);

export default router;
