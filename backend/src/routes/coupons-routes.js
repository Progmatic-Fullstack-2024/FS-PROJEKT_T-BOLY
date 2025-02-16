import express from "express";
import couponsController from "../controllers/coupons-controller.js";
import authenticate from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/", couponsController.getAllCoupons);
router.get("/:id", couponsController.getCouponById);
router.post("/", authenticate, couponsController.createCoupon);
router.put("/:id", authenticate, couponsController.updateCoupon);
router.delete("/:id", authenticate, couponsController.deleteCoupon);
router.get("/code/:code", couponsController.getCouponByCode);

export default router;
