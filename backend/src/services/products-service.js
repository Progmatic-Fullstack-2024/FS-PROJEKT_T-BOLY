import XLSX from "xlsx";
import { fileURLToPath } from "url";
import path from "path";
import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";
import { updateFile } from "./file.service.js";

const getAllProducts = async (
  sorting,
  order,
  page,
  limit,
  minimumPrice,
  maximumPrice,
  minAge,
  maxAge,
  players,
) => {
  const where = {
    AND: [
      { price: { gte: minimumPrice } },
      { price: { lte: maximumPrice } },
      { ageRecommendationMax: { gte: minAge } },
      { ageRecommendationMin: { lte: maxAge } },
    ],
  };

  if (players !== "all") {
    const [minPlayers, maxPlayers] = players.split("-").map(Number);
    where.AND.push({
      AND: [
        {
          playersNumberMax: { gte: minPlayers },
        },
        {
          playersNumberMin: { lte: maxPlayers },
        },
      ],
    });
  }
  const products = await prisma.product.findMany({
    where,
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
    orderBy:
      sorting === "rating"
        ? {
            [sorting]: {
              sort: order,
              nulls: "last",
            },
          }
        : {
            [sorting]: order,
          },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalProducts = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalProducts / limit);

  const { _min: minPrice, _max: maxPrice } = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
  });

  const minPriceValue = minPrice.price || 0;
  const maxPriceValue = maxPrice.price || 1000;

  return {
    products,
    totalProducts,
    totalPages,
    minPriceDb: minPriceValue,
    maxPriceDb: maxPriceValue,
  };
};

const getAllProductsByCategory = async (
  categoryId,
  sorting,
  order,
  page,
  limit,
  minimumPrice,
  maximumPrice,
  minAge,
  maxAge,
  players,
) => {
  const where = {
    categoryProduct: {
      some: { categoryId },
    },
    AND: [
      { price: { gte: minimumPrice } },
      { price: { lte: maximumPrice } },
      { ageRecommendationMax: { gte: minAge } },
      { ageRecommendationMin: { lte: maxAge } },
    ],
  };
  if (players !== "all") {
    const [minPlayers, maxPlayers] = players.split("-").map(Number);
    where.AND.push({
      AND: [
        {
          playersNumberMax: { gte: minPlayers },
        },
        {
          playersNumberMin: { lte: maxPlayers },
        },
      ],
    });
  }
  const products = await prisma.product.findMany({
    where,
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
    orderBy:
      sorting === "rating"
        ? {
            [sorting]: {
              sort: order,
              nulls: "last",
            },
          }
        : {
            [sorting]: order,
          },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalProducts = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalProducts / limit);

  const { _min: minPrice, _max: maxPrice } = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
  });

  const minPriceValue = minPrice.price || 0;
  const maxPriceValue = maxPrice.price || 1000;

  return {
    products,
    totalProducts,
    totalPages,
    minPriceDb: minPriceValue,
    maxPriceDb: maxPriceValue,
  };
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
  });
  if (!product) {
    throw new HttpError("Product not found", 404);
  }

  const categoryIds = product.categoryProduct.map(
    (category) => category.categoryId,
  );

  const categoryNames = product.categoryProduct.map(
    (categoryProduct) => categoryProduct.category.name,
  );

  const relatedProductsByCategory = await prisma.product.findMany({
    where: {
      categoryProduct: {
        some: {
          categoryId: {
            in: categoryIds,
          },
        },
      },
      rating: {
        not: null,
      },
      NOT: {
        id,
      },
    },
    include: { categoryProduct: true },
    orderBy: {
      rating: "desc",
    },
    take: 4,
  });

  return { product, relatedProductsByCategory, categoryNames };
};

const createProduct = async (productData) => {
  const newProduct = await prisma.product.create({
    data: productData,
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
  });
  return newProduct;
};

const updateProduct = async (id, productData, file) => {
  const product = prisma.product.findUnique({
    where: { id },
  });
  if (!product) throw new HttpError("Product not found", 404);
  const pictureUrl = await updateFile(product.pictureUrl, file);
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { ...productData, pictureUrl },
    include: {
      categoryProduct: { include: { category: { select: { name: true } } } },
    },
  });
  return updatedProduct;
};

const destroyProduct = async (id) => {
  await getProductById(id);
  return prisma.product.delete({
    where: { id },
  });
};

const exportProducts = async () => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
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
  const tempFilePath = path.join(dirname, "products.xlsx");
  XLSX.writeFile(workbook, tempFilePath);
  return tempFilePath;
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
