import api from './axiosInstance';

const createProduct = async (newProductData) => {
  const response = await api.post('/api/products', newProductData);
  
  return response.data;
};

const getAllProductsByCategory = async (categoryId, sorting, order, page, limit) => {
  const response = await api.get(
    `/api/products/category/${categoryId}?sorting=${sorting}&order=${order}&page=${page}&limit=${limit}`,
  );
  return response.data;
};

const getAllProducts = async (sorting, order, page, limit) => {
  const response = await api.get(
    `/api/products?sorting=${sorting}&order=${order}&page=${page}&limit=${limit}`,
  );
  return response.data;
};

const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

const destroyProduct = async (id) => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data;
};

export default { createProduct, getAllProductsByCategory, getAllProducts, destroyProduct, getProductById };
