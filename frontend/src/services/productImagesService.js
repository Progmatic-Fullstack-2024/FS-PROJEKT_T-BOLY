import api from './axiosInstance';

const updateProductImage = async (id, morePictureUrl, urlForDelete) => {
  const response = await api.put(`/api/images/${id}`, morePictureUrl, urlForDelete);
  return response.data;
};

export default {
  updateProductImage,
};
