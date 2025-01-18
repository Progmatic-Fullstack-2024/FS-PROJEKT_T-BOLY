import api from './axiosInstance';

const getProductCategoryConnectionById = async (connectionID) => {
  const response = await api.get(`/api/productCategoryConnection/${connectionID}`);
  return response.data;
};

const createProductCategoryConnection = async (newConnectionData) => {
  const response = await api.post(`/api/productCategoryConnection`, newConnectionData.data);
  console.log("Válaszunk: ",response)
  return response.data;
};

export default { getProductCategoryConnectionById, createProductCategoryConnection };
