import api from './axiosInstance';

const createReview = async (reviewData) => {
  const response = await api.post('/api/productReview', reviewData);
  const newReview = response.data;

  return newReview;
};

const allReviewByProduct = async (productId, page, itemsPerPage, rating) => {
  const response = await api.get(`/api/productReview/${productId}?`, {
    params: { page, itemsPerPage, rating },
  });
  const { reviews, totalPages, allReviews, totalReviews } = response.data;
  return { reviews, totalPages, allReviews, totalReviews };
};

const checkUserReview = async (userId, productId) => {
  const response = await api.get(`api/productReview/hasreviewed/${userId}/${productId}`);
  console.log(userId, productId);
  return response.data;
};

export default { createReview, allReviewByProduct, checkUserReview };
