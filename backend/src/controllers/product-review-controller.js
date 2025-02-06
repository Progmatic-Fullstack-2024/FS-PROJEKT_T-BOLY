import productReview from "../services/product-review.js";

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
  const { page, itemsPerPage } = req.query;

  const pageNumber = Number(page) || 1;
  const itemsPer = Number(itemsPerPage) || 5;

  try {
    const { reviews, totalPages, allReviews } =
      await productReview.listAllReviewByProduct(id, pageNumber, itemsPer);
    res.status(200).json({ reviews, totalPages, allReviews });
  } catch (error) {
    next(error);
  }
};

export default { createReview, listAllReviewByProduct };
