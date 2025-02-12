import categoriesService from "../services/categories-service.js";
import { createFile, updateFile } from "../services/file.service.js";

const getAllCategories = async (req, res, next) => {
  const { order = "asc", page = 1, limit = 10, search } = req.query;
  try {
    const { categories, totalCategories, totalPages } =
      await categoriesService.getAllCategories(
        order,
        Number(page),
        Number(limit),
        search,
      );

    res.status(200).json({ categories, totalCategories, totalPages });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const category = await categoriesService.getCategoryById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  const { name, description } = req.body;
  const file = req.file || null;
  try {
    const pictureUrl = await createFile(file);
    const newCategory = await categoriesService.createCategory({
      name,
      description,
      pictureUrl,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const file = req.file || null;
  try {
    const category = await categoriesService.getCategoryById(id);
    const pictureUrl = file
      ? await updateFile(category.pictureUrl, file)
      : category.pictureUrl;
    const updatedCategory = await categoriesService.updateCategory(id, {
      name,
      description,
      pictureUrl,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

const destroyCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await categoriesService.destroyCategory(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  destroyCategory,
};
