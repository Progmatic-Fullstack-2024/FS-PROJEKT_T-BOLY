import api from "./axiosInstance";

// const getAllProducts=async () => {
//     const response = await api.get("/api/products");
//     return response.data;
// }; 

const getAllProductsByCategory = async (categoryId) => {
    const response = await api.get(`/api/products/category/${categoryId}`);
    return response.data;
}; 

export default { getAllProductsByCategory }