import api from './axiosInstance';

const createReview = async (reviewData) => {
  const response = await api.post('/api/productReview', reviewData);
  const newReview = response.data;

  return newReview;
};

const allReviewByProduct = async (productId, pageNumber, itemsPerPage) => {
  const response = await api.get(`/api/productReview/${productId}`, {
    params: { pageNumber, itemsPerPage },
  });
  const { reviews, totalPages } = response.data;
  return { reviews, totalPages };
};

export default { createReview, allReviewByProduct };
