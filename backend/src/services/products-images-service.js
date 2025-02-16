import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getProductMoreImagesById = async (id) => {
  const product = prisma.product.findUnique({
    where: { id },
  });
  if (!product) throw new HttpError("Product not found", 404);
  return product;
};

const updateProductImages = async (id, morePictureUrl) => {
  const product = prisma.product.findUnique({
    where: { id },
  });

  if (!product) throw new HttpError("Product not found", 404);

  const updatedProductImages = await prisma.product.update({
    where: { id },
    data: { morePictureUrl },
  });

  return updatedProductImages;
};

export default {
  getProductMoreImagesById,
  updateProductImages,
};
