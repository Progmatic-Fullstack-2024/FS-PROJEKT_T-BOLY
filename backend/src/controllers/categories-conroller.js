import categoriesService from "../services/categories-service.js";

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(200).json(categories);
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
  const { name, description, pictureUrl } = req.body;
  try {
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
  const { name, description, pictureUrl } = req.body;
  try {
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
