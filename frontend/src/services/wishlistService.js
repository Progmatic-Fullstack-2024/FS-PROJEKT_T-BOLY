import axiosInstance from './axiosInstance';

const getWishlist = async () => {
  const response = await axiosInstance.get(`/api/wishlist`);
  return response.data;
};

const addProduct = async (productId) => {
  const response = await axiosInstance.post(`/api/wishlist`, { productId });
  return response.data;
};

const removeProduct = async (productId) => {
  const response = await axiosInstance.delete(`/api/wishlist/${productId}`);
  return response.data;
};

export default { getWishlist, addProduct, removeProduct };
