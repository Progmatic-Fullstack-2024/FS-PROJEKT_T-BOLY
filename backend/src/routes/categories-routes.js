import express from "express";
import categoriesController from "../controllers/categories-conroller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getCategoryById);
router.post("/", upload.single("image"), categoriesController.createCategory);
router.put("/:id", upload.single("image"), categoriesController.updateCategory);
router.delete("/:id", categoriesController.destroyCategory);

export default router;
