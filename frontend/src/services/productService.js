import api from './axiosInstance';

const getAllProductsByCategory = async (categoryId) => {
  const response = await api.get(`/api/products/category/${categoryId}`);
  return response.data;
};

const getAllProducts = async () => {
  const response = await api.get('/api/products');
  return response.data;
};
export default { getAllProductsByCategory, getAllProducts };
