import express from "express";
import userController from "../controllers/user-controller.js";
import authenticate from "../middlewares/auth-middleware.js";

const router = express.Router();

router.put("/:id", authenticate, userController.updateUser);

router.get("/usernames", authenticate, userController.listUsernames);

export default router;
