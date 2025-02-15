import api from "./axiosInstance";

const getStatistics = async () => {
  const response = await api.get("/api/statistics");
  return response.data;
};

export default { getStatistics };
