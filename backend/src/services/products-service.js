import XLSX from "xlsx";
import { fileURLToPath } from "url";
import path from "path";
import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
const exportProducts = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const products = await prisma.product.findMany({
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
  });
  const worksheetData = [
    ["Product", "Description", "Category", "Price", "Quantity", "Rating"],
    ...products.map((product) => [
      product.name,
      product.description,
      product.categoryProduct.map((c) => c.category.name).join(", "),
      product.price,
      product.quantity,
      product.rating,
    ]),
  ];

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  const tempFilePath = path.join(__dirname, "products.xlsx");
  XLSX.writeFile(workbook, tempFilePath);
  return tempFilePath;
};

const getAllProducts = async (
  sorting,
  order,
  pageNumber,
  limitNumber,
  filterByMinPrice,
  filterByMaxPrice
) => {
  const where = {
    AND: [
      { price: { gte: filterByMinPrice } },
      { price: { lte: filterByMaxPrice } },
    ],
  };
  const products = await prisma.product.findMany({
    where,
    orderBy: { [sorting]: order },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });
  const totalProducts = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalProducts / limitNumber);
  return { products, totalProducts, totalPages };
};

const getAllProductsByCategory = async (
  categoryId,
  sorting,
  order,
  pageNumber,
  limitNumber,
  filterByMinPrice,
  filterByMaxPrice
) => {
  const where = {
    categoryProduct: {
      some: { categoryId },
    },
    AND: [
      { price: { gte: filterByMinPrice } },
      { price: { lte: filterByMaxPrice } },
    ],
  };
  const products = await prisma.product.findMany({
    where,
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
    orderBy: { [sorting]: order },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });
  const totalProducts = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalProducts / limitNumber);

  return { products, totalProducts, totalPages };
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
  exportProducts,
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  destroyProduct,
};
