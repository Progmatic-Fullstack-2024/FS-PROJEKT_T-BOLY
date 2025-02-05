import api from './axiosInstance';

const createProduct = async (newProductData) => {
  const response = await api.post('/api/products', newProductData);

  return response.data;
};

const exportProducts = async () => {
  try {
    const response = await api.get('/api/products/export', { responseType: 'blob' });

    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'products.xlsx';

    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error('Export failed');
  }
};

const updatedProduct = async (id, formdata) => {
  const response = await api.put(`/api/products/${id}`, formdata);
  return response.data;
};

const getAllProductsByCategory = async (categoryId, searchParams) => {
  const response = await api.get(`/api/products/category/${categoryId}?${searchParams}`);
  return response.data;
};

const getAllProducts = async (searchParams) => {
  const response = await api.get(`/api/products?${searchParams}`);
  return response.data;
};

const getProductById = async (productId) => {
  const response = await api.get(`/api/products/${productId}`);
  return response.data;
};

const destroyProduct = async (id) => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data;
};

export default {
  createProduct,
  getAllProductsByCategory,
  getAllProducts,
  getProductById,
  destroyProduct,
  exportProducts,
  updatedProduct,
};
