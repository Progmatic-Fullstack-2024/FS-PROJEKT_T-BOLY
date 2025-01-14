import api from './axiosInstance';

const updateUser = async (id) => {
  const response = await api.get(`/api/user/${id}`);
  return response.data;
};


export default { updateUser };
