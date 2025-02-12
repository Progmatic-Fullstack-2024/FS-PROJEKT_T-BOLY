import api from './axiosInstance';

const getAllCategories = async () => {
  const response = await api.get('/api/categories');
  return response.data;
};

const getCategoryById = async (categoryId) => {
  const response = await api.get(`/api/categories/${categoryId}`);
  return response.data;
};

const createCategory = async (categoryData) => {
  const response = await api.post('/api/categories', categoryData);
  return response.data;
};

const updateCategory = async (categoryId, categoryData) => {
  const response = await api.put(`/api/categories/${categoryId}`, categoryData);
  return response.data;
};

const deleteCategory = async (categoryId) => {
  const response = await api.delete(`/api/categories/${categoryId}`);
  return response.data;
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
