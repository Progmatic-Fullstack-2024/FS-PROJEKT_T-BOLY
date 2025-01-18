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

export default { updateUser, listUsernames };
