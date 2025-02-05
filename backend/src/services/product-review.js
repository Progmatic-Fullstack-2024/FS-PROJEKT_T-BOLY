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
  const { _avg: avg } = await prisma.review.aggregate({
    where: { productId },
    _avg: {
      rating: true,
    },
  });
  const averageRating = avg.rating || 0;

  await prisma.product.update({
    where: { id: productId },
    data: { rating: averageRating },
  });

  return newReview;
};

const listAllReviewByProduct = async (id, page, limit) => {
  const offset = (page - 1) * limit;
  const reviews = await prisma.review.findMany({
    where: { productId: id },
    skip: offset,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const allReviews = await prisma.review.findMany({ where: { productId: id } });
  const totalReviews = allReviews.length;

  const totalPages = Math.ceil(totalReviews / limit);
  return { reviews, totalPages, allReviews };
};

export default { createReview, listAllReviewByProduct };
