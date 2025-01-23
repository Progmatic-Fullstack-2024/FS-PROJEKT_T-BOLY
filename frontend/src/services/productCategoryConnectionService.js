import api from './axiosInstance';

const getProductCategoryConnectionById = async (connectionID) => {
  const response = await api.get(`/api/productCategoryConnection/${connectionID}`);
  return response.data;
};

const createProductCategoryConnection = async (newConnectionData) => {
  const response = await api.post(`/api/productCategoryConnection`, newConnectionData);
  return response.data;
};

const destroyProductCategoryConnection = async (productId) => {
  const response = await api.delete(`/api/productCategoryConnection/${productId}`);
  return response.data;
};

const updateProductCategoryConnection = async (id, updatesConnectionData) => {
  const response = await api.put(`/api/productCategoryConnection${id}`, updatesConnectionData.data);
  return response.data;
};

export default {
  getProductCategoryConnectionById,
  createProductCategoryConnection,
  updateProductCategoryConnection,
  destroyProductCategoryConnection,
};
