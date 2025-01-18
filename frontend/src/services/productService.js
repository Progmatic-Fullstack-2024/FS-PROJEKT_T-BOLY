import api from './axiosInstance';

const getAllProductsByCategory = async (categoryId, sorting, order, page, limit, filterByMinPrice, filterByMaxPrice, filterByMinAge, filterByMaxAge, filterByPlayersNumber) => {
  const response = await api.get(
    `/api/products/category/${categoryId}?sorting=${sorting}&order=${order}&page=${page}&limit=${limit}&minPrice=${filterByMinPrice}&maxPrice=${filterByMaxPrice}&minAge=${filterByMinAge}&maxAge=${filterByMaxAge}&players=${filterByPlayersNumber}`,
  );
  return response.data;
};

const getAllProducts = async (sorting, order, page, limit, filterByMinPrice, filterByMaxPrice, filterByMinAge, filterByMaxAge, filterByPlayersNumber) => {
  const response = await api.get(
    `/api/products?sorting=${sorting}&order=${order}&page=${page}&limit=${limit}&minPrice=${filterByMinPrice}&maxPrice=${filterByMaxPrice}&minAge=${filterByMinAge}&maxAge=${filterByMaxAge}&players=${filterByPlayersNumber}`,
  );
  return response.data;
};
export default { getAllProductsByCategory, getAllProducts };
