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

  // const existedPictures =
  //   await productImagesService.getProductMoreImagesById(id);
  // console.log("ExistedPictures", existedPictures.morePictureUrl);

  try {
    await deleteFile(urlForDelete); // Cloudinary deleting
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
