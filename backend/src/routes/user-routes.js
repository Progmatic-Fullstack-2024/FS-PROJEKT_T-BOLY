import express from "express";
import userController from "../controllers/user-controller.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/:id", authMiddleware, userController.getUserById);
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);

export default router;
