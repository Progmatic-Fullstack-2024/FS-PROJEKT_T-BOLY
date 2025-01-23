import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllProducts = async (
  sorting,
  order,
  pageNumber,
  limitNumber,
  filterByMinPrice,
  filterByMaxPrice,
  filterByMinAge,
  filterByMaxAge,
  filterByPlayersNumber,
) => {
  const where = {
    AND: [
      { price: { gte: filterByMinPrice } },
      { price: { lte: filterByMaxPrice } },
      { ageRecommendationMax: { gte: filterByMinAge } },
      { ageRecommendationMin: { lte: filterByMaxAge } },
    ],
  };
  if (filterByPlayersNumber !== "all") {
    const [minPlayers, maxPlayers] = filterByPlayersNumber
      .split("-")
      .map(Number);
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
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });
  const totalProducts = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalProducts / limitNumber);

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
  pageNumber,
  limitNumber,
  filterByMinPrice,
  filterByMaxPrice,
  filterByMinAge,
  filterByMaxAge,
  filterByPlayersNumber,
) => {
  const where = {
    categoryProduct: {
      some: { categoryId },
    },
    AND: [
      { price: { gte: filterByMinPrice } },
      { price: { lte: filterByMaxPrice } },
      { ageRecommendationMax: { gte: filterByMinAge } },
      { ageRecommendationMin: { lte: filterByMaxAge } },
    ],
  };
  if (filterByPlayersNumber !== "all") {
    const [minPlayers, maxPlayers] = filterByPlayersNumber
      .split("-")
      .map(Number);
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
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });
  const totalProducts = await prisma.product.count({ where });
  const totalPages = Math.ceil(totalProducts / limitNumber);

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
