import api from './axiosInstance';

const createReview = async (reviewData) => {
  const response = await api.post('/api/productReview', reviewData);
  const newReview = response.data;

  return newReview;
};

const allReviewByProduct = async (productId, page, itemsPerPage) => {
  const response = await api.get(`/api/productReview/${productId}`, {
    params: { page, itemsPerPage },
  });
  const { reviews, totalPages, allReviews } = response.data;
  return { reviews, totalPages, allReviews };
};

export default { createReview, allReviewByProduct };
