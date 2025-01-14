import api from './axiosInstance';

const updateUser = async (id, userData) => {
    try {
      const response = await api.put(`/api/user/${id}`, userData);
      
      const { updatedUser, token } = response.data;
  
      return { updatedUser, token };
    } catch (error) {

      console.error('Error updating user:', error);
      throw error;
    }
  };

export default { updateUser };
