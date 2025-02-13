import express from "express";
import orderController from "../controllers/order-controller.js";
import authenticate from "../middlewares/auth-middleware.js";
import orderItemController from "../controllers/orderItem-controller.js";

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/ordersByUser", authenticate, orderController.getOrdersByUserId);
router.get(
  "/ordersByUser/orderItems",
  orderItemController.getAllOrderItemsByOrderId
);
router.get("/:id", orderController.getOrderById);
router.post("/", authenticate, orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.put("/cancel", orderController.destroyOrder);

export default router;
