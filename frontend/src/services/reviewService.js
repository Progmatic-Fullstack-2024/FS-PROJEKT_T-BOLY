import api from './axiosInstance';

const createReview = async (reviewData) => {
  const response = await api.post('/api/productReview', reviewData);
  const newReview = response.data;
  return newReview;
};

const allReviewByProduct = async (productId) => {
  const response = await api.get(`/api/productReview/${productId}`);
  const allReview = response.data;
  return allReview;
};

export default { createReview, allReviewByProduct };
