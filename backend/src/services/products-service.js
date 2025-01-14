import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllProducts = async (sorting, order, pageNumber, limitNumber) =>
  prisma.product.findMany({
    orderBy: { [sorting]: order },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });

const getAllProductsByCategory = async (
  categoryId,
  sorting,
  order,
  pageNumber,
  limitNumber,
) =>
  prisma.product.findMany({
    where: { categoryProduct: { some: { categoryId } } },
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
    orderBy: { [sorting]: order },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });

const getTotalProductsCountByCategory = async (categoryId) => {
  const count = await prisma.product.count({
    where:
      categoryId === "all" ? {} : { categoryProduct: { some: { categoryId } } },
  });
  return count;
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  if (!product) {
    throw new HttpError("Product not found", 404);
  }
  return product;
};

const createProduct = async (productData) => {
  const newProduct = await prisma.product.create({
    data: productData,
  });
  return newProduct;
};

const updateProduct = async (id, productData) => {
  const product = prisma.product.findUnique({
    where: { id },
  });
  if (!product) throw new HttpError("Product not found", 404);
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: productData,
  });
  return updatedProduct;
};

const destroyProduct = async (id) => {
  await getProductById(id);
  return prisma.product.delete({
    where: { id },
  });
};

export default {
  getAllProducts,
  getAllProductsByCategory,
  getTotalProductsCountByCategory,
  getProductById,
  createProduct,
  updateProduct,
  destroyProduct,
};
