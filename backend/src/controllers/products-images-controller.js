import { deleteFile } from "../services/file.service.js";
import productImagesService from "../services/products-images-service.js";

const getProductImagesById = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const { morePictureUrl } =
      await productImagesService.getProductMoreImagesById(productId);
    res.status(200).json({ morePictureUrl });
  } catch (error) {
    next(error);
  }
};

const updateProductImages = async (req, res, next) => {
  const { id } = req.params;
  const { morePictureUrl, urlForDelete } = req.body;

  try {
    await deleteFile(urlForDelete);
    const updatedProductImages = await productImagesService.updateProductImages(
      id,
      morePictureUrl,
    );
    res.status(200).json(updatedProductImages);
  } catch (error) {
    next(error);
  }
};

export default {
  getProductImagesById,
  updateProductImages,
};
