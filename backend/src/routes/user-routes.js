import express from "express";
import userController from "../controllers/user-controller";

const router = express.Router();

router.put("/:id", userController.updateUser);

export default router;
