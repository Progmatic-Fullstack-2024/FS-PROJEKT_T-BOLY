import api from './axiosInstance';

const getAllOrders = async () => {
  const response = await api.get('/api/order');
  const orders = response.data;
  return orders;
};

const getOrderById = async (id) => {
  const response = await api.get(`/api/order/${id}`);
  const order = response.data;
  return order;
};

const getOrdersByUserId = async () => {
  const response = await api.get(`/api/ordersByUser`);
  return response.data;
};

const createOrder = async (paymentId, totalPrice, status) => {
  const response = await api.post('/api/order', { paymentId, totalPrice, status });
  const newOrder = response.data;
  return newOrder;
};

const updateOrder = async (status) => {
  const response = await api.put(`/api/order`, { status });
  return response.data;
};

const destroyOrder = async (status) => {
  const response = await api.put(`/api/order/cancel`, { status });
  return response.data;
};

export default {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  destroyOrder,
};
