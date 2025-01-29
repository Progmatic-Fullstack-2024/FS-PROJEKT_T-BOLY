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

export default { createReview };
