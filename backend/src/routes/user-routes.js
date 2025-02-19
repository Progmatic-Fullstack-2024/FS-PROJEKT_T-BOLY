import express from "express";
import userController from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import adminMiddleware from "../middlewares/admin-middleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/usernames", authMiddleware, userController.listUsernames);

router.patch(
  "/userimage",
  upload.single("image"),
  authMiddleware,
  userController.updateProfilePicture,
);

router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/:id", userController.getUserById);
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.post("/", authMiddleware, adminMiddleware, userController.createUser);

export default router;
