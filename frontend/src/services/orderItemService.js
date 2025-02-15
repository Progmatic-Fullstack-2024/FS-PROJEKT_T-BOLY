import api from './axiosInstance';

const getAllOrderItemsByOrderId = async (orderId) => {
  const response = await api.get(`/api/order/orderItemsByOrder/${orderId}`);
  return response.data;
};

const createOrderItem = async (orderId, productId, quantity, price) => {
  const response = await api.post('/api/order', { orderId, productId, quantity, price });
  const newOrderItem = response.data;
  return newOrderItem;
};

export default {
  getAllOrderItemsByOrderId,
  createOrderItem,
};
