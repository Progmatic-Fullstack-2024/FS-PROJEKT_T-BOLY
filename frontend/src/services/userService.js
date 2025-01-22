import api from './axiosInstance';

const getAllUsers = async (sorting, order, page, limit) => {
  const response = await api.get(
    `/api/user?sorting=${sorting}&order=${order}&pageNumber=${page}&limitNumber=${limit}`,
  );
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/api/user/${id}`);
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await api.put(`/api/user/${id}`, userData);
  return response.data;
};

export default { getAllUsers, deleteUser, updateUser };
