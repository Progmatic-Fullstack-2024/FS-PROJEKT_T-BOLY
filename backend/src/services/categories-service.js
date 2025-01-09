import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllCategories = async (order) =>
  prisma.category.findMany({ orderBy: { name: order } });

const getCategoryById = async (id) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category) {
    throw new HttpError("Category not found", 404);
  }
  return category;
};

const createCategory = async (categoryData) => {
  const newCategory = await prisma.category.create({
    data: categoryData,
  });
  return newCategory;
};

const updateCategory = async (id, categoryData) => {
  const category = prisma.category.findUnique({
    where: { id },
  });
  if (!category) throw new HttpError("Category not found", 404);
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: categoryData,
  });
  return updatedCategory;
};

const destroyCategory = async (id) => {
  await getCategoryById(id);
  return prisma.category.delete({
    where: { id },
  });
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  destroyCategory,
};
