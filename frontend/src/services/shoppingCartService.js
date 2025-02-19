import api from './axiosInstance';

const getAllShoppingCarts = async () => {
  const response = await api.get('/api/shoppingCart');
  const shoppingCarts = response.data;
  return shoppingCarts;
};

const getShoppingCartByUserId = async () => {
  const response = await api.get(`/api/shoppingCart`);
  return response.data;
};

const addCartItem = async (productId, quantity) => {
  const response = await api.post('/api/shoppingCart', { productId, quantity });
  const updatedUser = response.data;
  return updatedUser;
};

const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/api/shoppingCart`, { productId, quantity });

  return response.data;
};

const removeCartItem = async (productId) => {
  const response = await api.delete(`/api/shoppingCart`, { data: { productId } });
  return response.data;
};

const clearShoppingCart = async () => {
  const response = await api.delete(`/api/shoppingCart/clear`);
  return response.data;
};

export default {
  getAllShoppingCarts,
  getShoppingCartByUserId,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearShoppingCart,
};
