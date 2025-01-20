import express from "express";
import userController from "../controllers/user-controller.js";
import authenticate from "../middlewares/auth-middleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.put("/:id", authenticate, userController.updateUser);

router.get("/usernames", authenticate, userController.listUsernames);

router.patch(
  "/userimage",
  upload.single("image"),
  authenticate,
  userController.updateProfilePicture
);
export default router;
