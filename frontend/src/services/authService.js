import axiosInstance from './axiosInstance';

const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

const passwordChange = async (id, credentials) => {
  const response = await axiosInstance.put(`/auth/password_change/${id}`, credentials);
  return response.data;
};

export default { register, login, passwordChange };
