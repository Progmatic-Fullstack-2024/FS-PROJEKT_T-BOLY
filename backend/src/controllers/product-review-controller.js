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

  try {
    const reviews = await productReview.listAllReviewByProduct(id);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export default { createReview, listAllReviewByProduct };
