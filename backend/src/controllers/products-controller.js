import productService from "../services/products-service.js";

const getAllProducts = async (req, res, next) => {
  const { sorting = "name", order = "asc", page = 1, limit = 9 } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  try {
    const products = await productService.getAllProducts(
      sorting,
      order,
      pageNumber,
      limitNumber,
    );
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getAllProductsByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const { sorting = "name", order = "asc", page = 1, limit = 9 } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  try {
    let products;
    if (categoryId === "all") {
      products = await productService.getAllProducts(
        sorting,
        order,
        pageNumber,
        limitNumber,
      );
    } else {
      products = await productService.getAllProductsByCategory(
        categoryId,
        sorting,
        order,
        pageNumber,
        limitNumber,
      );
    }
    const totalPages = Math.ceil(
      (await productService.getTotalProductsCountByCategory(categoryId)) /
        limitNumber,
    );
    const totalProducts =
      await productService.getTotalProductsCountByCategory(categoryId);

    res.status(200).json({ products, pageNumber, totalPages, totalProducts });
  } catch (error) {
    next(error);
  }
};

const getTotalProductsCountByCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const count =
    await productService.getTotalProductsCountByCategory(categoryId);
  try {
    res.status(200).json(count);
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
    pictureUrl,
    quantity,
    rating,
    ageRecommendationMin,
    ageRecommendationMax,
    playersNumberMin,
    playersNumberMax,
  } = req.body;
  try {
    const newProduct = await productService.createProduct({
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
  getAllProducts,
  getAllProductsByCategory,
  getTotalProductsCountByCategory,
  getProductById,
  createProduct,
  updateProduct,
  destroyProduct,
};
