import api from './axiosInstance';

const updateUser = async (id, userData) => {
  const response = await api.put(`/api/user/${id}`, userData);
  return response.data;
};

export default { updateUser };
