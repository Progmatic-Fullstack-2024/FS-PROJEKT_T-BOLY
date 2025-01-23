import productCategoryService from "../services/product-category-service.js";

const getConnectionById = async (req, res, next) => {
  const connectionId = req.params.id;
  try {
    const connection =
      await productCategoryService.getConnectionById(connectionId);
    res.status(200).json(connection);
  } catch (error) {
    next(error);
  }
};
const createProductCategoryConnection = async (req, res, next) => {
  const { categoryId, productId } = req.body;
  try {
    const newConnection =
      await productCategoryService.createProductCategoryConnection({
        categoryId,
        productId,
      });
    res.status(201).json(newConnection);
  } catch (error) {
    next(error);
  }
};
const updateProductCategoryConnection = async (req, res, next) => {
  const { id } = req.params;
  const { productId, categoryId } = req.body;
  try {
    const updatedConnection =
      await productCategoryService.updateProductCategoryConnection(id, {
        productId,
        categoryId,
      });
    res.status(200).json(updatedConnection);
  } catch (error) {
    next(error);
  }
};
const destroyConnection = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedConnection =
      await productCategoryService.destroyConnection(productId);
    res.status(200).json(deletedConnection);
  } catch (error) {
    next(error);
  }
};
export default {
  getConnectionById,
  createProductCategoryConnection,
  updateProductCategoryConnection,
  destroyConnection,
};
