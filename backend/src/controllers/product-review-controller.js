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
  const { pageNumber, itemsPerPage } = req.query;

  const page = Number(pageNumber);
  const itemsPer = Number(itemsPerPage);
  console.log("pageNumber:", page, "items", itemsPer);

  try {
    const { reviews, totalPages } = await productReview.listAllReviewByProduct(
      id,
      page,
      itemsPer
    );
    res.status(200).json({ reviews, totalPages });
  } catch (error) {
    next(error);
  }
};

export default { createReview, listAllReviewByProduct };
