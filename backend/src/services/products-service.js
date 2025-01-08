import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllProducts = async (order) =>
  prisma.product.findMany({ orderBy: { name: order } });

const getAllProductsByCategory = async (categoryId, order) =>
  prisma.product.findMany({
    where: { categoryProduct: { some: { categoryId } } },
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
    orderBy: { name: order },
  });

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
  getProductById,
  createProduct,
  updateProduct,
  destroyProduct,
};
