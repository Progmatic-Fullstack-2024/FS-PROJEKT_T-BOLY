import api from './axiosInstance';

const updateUser = async (id, userData) => {
  const response = await api.put(`/api/user/${id}`, userData);

  const { updatedUser, token } = response.data;

  return { updatedUser, token };
};

const listUsernames = async () => {
  const response = await api.get('/api/user/usernames');
  const usernames = response.data;
  return usernames;
};

const updateProfilePictureUrl = async (userData) => {
  const response = await api.patch('/api/user/userimage', userData);
  const updatedUser = response.data;
  return updatedUser;
};

const getAllUsers = async (queryParams) => {
  const response = await api.get(`/api/user?${queryParams}`);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/api/user/${id}`);
  return response.data;
};

const createUser = async (userData) => {
  const response = await api.post('/api/user/', userData);
  return response.data;
};

export default {
  listUsernames,
  updateProfilePictureUrl,
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
};
