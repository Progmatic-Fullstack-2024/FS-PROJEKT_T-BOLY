import api from './axiosInstance';

const createPaymentIntent = async (data) => {
  const response = await api.post('/api/payment', data);
  return response.data.clientSecret;
};

export default { createPaymentIntent };
