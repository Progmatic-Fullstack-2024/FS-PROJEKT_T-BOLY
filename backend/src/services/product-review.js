import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const createReview = async ({ productId, userId, rating, review }) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) throw new HttpError("This product does not exist", 404);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) throw new HttpError("This user does not exist", 404);
  const newReview = await prisma.review.create({
    data: {
      productId,
      userId,
      rating,
      review,
    },
  });
  return newReview;
};

export default { createReview };
