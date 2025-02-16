import api from './axiosInstance';

const getStatistics = async () => {
  const response = await api.get('/api/statistics/admin');
  return response.data;
};

export default { getStatistics };
