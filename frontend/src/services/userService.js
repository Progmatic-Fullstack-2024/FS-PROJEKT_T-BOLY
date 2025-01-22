import api from './axiosInstance';

const getAllUsers = async (sorting, order, page, limit) => {
  const response = await api.get(
    `/api/users?sorting=${sorting}&order=${order}&page=${page}&limit=${limit}`
  );
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};

export default { getAllUsers, deleteUser };
