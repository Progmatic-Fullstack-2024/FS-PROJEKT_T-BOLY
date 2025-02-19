import productReview from "../services/product-review.js";
import HttpError from "../utils/HttpError.js";

const createReview = async (req, res, next) => {
  const { productId, userId, rating, review } = req.body;
  try {
    const newReview = await productReview.createReview({
      productId,
      userId,
      rating,
      review,
    });
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

const listAllReviewByProduct = async (req, res, next) => {
  const { id } = req.params;
  const { page, itemsPerPage, rating } = req.query;

  const pageNumber = Number(page) || 1;
  const itemsPer = Number(itemsPerPage) || 5;

  try {
    const { reviews, totalPages, allReviews, totalReviews } =
      await productReview.listAllReviewByProduct(
        id,
        pageNumber,
        itemsPer,
        rating ? Number(rating) : null,
      );
    res.status(200).json({ reviews, totalPages, allReviews, totalReviews });
  } catch (error) {
    next(error);
  }
};

const checkUserReview = async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    if (!userId || !productId)
      throw new HttpError("No userId or productId", 400);
    const hasReviewed = await productReview.hasReviewed(userId, productId);
    res.json(hasReviewed);
  } catch (error) {
    next(error);
  }
};

export default { createReview, listAllReviewByProduct, checkUserReview };
