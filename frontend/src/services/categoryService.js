import api from './axiosInstance';

const getAllCategories = async () => {
  const response = await api.get('/api/categories');
  return response.data;
};

const getCategoryById = async (categoryId) => {
  const response = await api.get(`/api/categories/${categoryId}`);
  return response.data;
};

export default { getAllCategories, getCategoryById };
