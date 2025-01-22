import fs from "fs";
import { createFile } from "../services/file.service.js";
import productService from "../services/products-service.js";

const exportProducts = async (req, res, next) => {
  try {
    const filePath = await productService.exportProducts();
    res.status(200).download(filePath);
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  const {
    sorting = "name",
    order = "asc",
    page = 1,
    limit = 9,
    minPrice = 0,
    maxPrice = 1000,
  } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const minPriceNumber = Number(minPrice);
  const maxPriceNumber = Number(maxPrice);

  try {
    const result = await productService.getAllProducts(
      sorting,
      order,
      pageNumber,
      limitNumber,
      minPriceNumber,
      maxPriceNumber,
    );
    const { products, totalPages, totalProducts } = result;
    res.status(200).json({ products, pageNumber, totalPages, totalProducts });
  } catch (error) {
    next(error);
  }
};

const getAllProductsByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const {
    sorting = "name",
    order = "asc",
    page = 1,
    limit = 9,
    minPrice = 0,
    maxPrice = 1000,
  } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const minPriceNumber = Number(minPrice);
  const maxPriceNumber = Number(maxPrice);

  try {
    let result;
    if (categoryId === "all") {
      result = await productService.getAllProducts(
        sorting,
        order,
        pageNumber,
        limitNumber,
        minPriceNumber,
        maxPriceNumber,
      );
    } else {
      result = await productService.getAllProductsByCategory(
        categoryId,
        sorting,
        order,
        pageNumber,
        limitNumber,
        minPriceNumber,
        maxPriceNumber,
      );
    }

    const { products, totalPages, totalProducts } = result;
    res.status(200).json({ products, pageNumber, totalPages, totalProducts });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await productService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const {
    name,
    description,
    price,
    quantity,
    ageRecommendationMin,
    ageRecommendationMax,
    playersNumberMin,
    playersNumberMax,
  } = req.body;
  const file = req.file || null;

  try {
    const pictureUrl = await createFile(file);
    const newProduct = await productService.createProduct({
      name,
      description,
      price: Number(price),
      pictureUrl,
      quantity: Number(quantity),
      ageRecommendationMin: Number(ageRecommendationMin),
      ageRecommendationMax: Number(ageRecommendationMax),
      playersNumberMin: Number(playersNumberMin),
      playersNumberMax: Number(playersNumberMax),
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    pictureUrl,
    quantity,
    rating,
    ageRecommendationMin,
    ageRecommendationMax,
    playersNumberMin,
    playersNumberMax,
  } = req.body;
  try {
    const updatedProduct = await productService.updateProduct(id, {
      name,
      description,
      price,
      pictureUrl,
      quantity,
      rating,
      ageRecommendationMin,
      ageRecommendationMax,
      playersNumberMin,
      playersNumberMax,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const destroyProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.destroyProduct(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
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
