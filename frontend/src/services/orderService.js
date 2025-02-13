import api from './axiosInstance';

const getAllOrders = async (searchParams) => {
  const response = await api.get(`/api/order?${searchParams}`);
  return response.data;
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

const createOrder = async (orderData) => {
  const response = await api.post('/api/order', orderData);
  const newOrder = response.data;
  return newOrder;
};

const updateOrder = async (id, status) => {
  const response = await api.put(`/api/order/${id}`, { status });
  return response.data;
};

const destroyOrder = async (id, status) => {
  const response = await api.put(`/api/order/cancel/${id}`, { status });
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
